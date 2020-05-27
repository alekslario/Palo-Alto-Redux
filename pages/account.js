import { useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";
import { redirectUser, handleLogout } from "../utils/auth";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Account/_Account";
import cookie from "js-cookie";
import contactServer from "../utils/contactServer";

function Account({ user }) {
  const [store, dispatch] = useStore();
  const [deleteWarning, setDeleteWarning] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    let didCancel = false;
    async function mergeCart() {
      const token = cookie.get("token");
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
      } catch (error) {
        console.log(error);
      }
      const response = await contactServer({
        data: {
          payloadProducts: cart.reduce(
            (acc, { productId, contentId, quantity }) => {
              acc[productId] = { contentId, quantity };
              return acc;
            },
            {}
          ),
        },
        route: "cart",
        auth: token,
        method: cart.length > 0 ? "POST" : "GET",
      });
      if (response?.status === 200) {
        localStorage.removeItem("cart");
        dispatch({ type: "DELIVER_CART", items: response.data.cart, user });
      }
    }
    mergeCart();
    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event) => {
      if (event.key === "logout") {
        cookie.remove("token");
        router.push("/login");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handelDeleteUser = async () => {
    const token = cookie.get("token");
    const response = await contactServer({
      auth: token,
      route: "account",
      method: "DELETE",
    });
    if (response.status === 200) {
      dispatch({ type: "LOGOUT" });
    } else {
      setDeleteWarning(response.message);
    }
  };
  console.log(store);
  return (
    <$.PageWrapper>
      <h1
        css={`
          padding-bottom: 20px;
        `}
      >
        My Account{" "}
        <button onClick={() => dispatch({ type: "LOGOUT" })}>Log out</button>
      </h1>
      <br />
      <button onClick={handelDeleteUser}>Delete account</button>
      {deleteWarning && <span>{deleteWarning}</span>}
      <br />
      <div
        css={`
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        `}
      >
        <div>
          <h2>Order history</h2>
          <div></div>
        </div>
        <div>
          <h2>Account details</h2>
          <div>details</div>
          <button>View Addresses</button>
        </div>
      </div>
    </$.PageWrapper>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    redirectUser(ctx, "/login");
  } else {
    try {
      const payload = { headers: { Authorization: token } };
      const url = `${baseUrl}/api/account`;
      const response = await axios.get(url, payload);
      if (response.data.status === 404) {
        throw "Error getting current user";
      } else {
        console.log("account response", response.data);
        return { props: { ...response.data } };
      }
    } catch (error) {
      console.error("Error getting current user", error);
      // 1) Throw out invalid token
      destroyCookie(ctx, "token");
      // 2) Redirect to login
      redirectUser(ctx, "/login");
    }
  }
  return { props: {} };
}

export default Account;
