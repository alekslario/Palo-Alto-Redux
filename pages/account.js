import { useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";
import { redirectUser, handleLogout } from "../utils/auth";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Account/_Account";
const { getName } = require("country-list");
import AddressList from "../components/Account/AddressList";
import cookie from "js-cookie";
import contactServer from "../utils/contactServer";
import Popup from "../components/Account/PopUp";

function Account({ user }) {
  const [store, dispatch] = useStore();
  const [addressOverview, setAddressOverview] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState("");
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "SET_USER", user });
  }, []);

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

  const handleManageAddress = () => setAddressOverview((prev) => !prev);
  return (
    <$.PageWrapper>
      {!addressOverview ? (
        <>
          <div>
            <$.Row>
              <$.Title>My Account</$.Title>
              <$.Row
                css={`
                  justify-content: space-between;
                  width: 100%;
                `}
              >
                <button
                  css={`
                    color: ${({ theme }) => theme.colors.alpha};
                  `}
                  onClick={() => dispatch({ type: "LOGOUT" })}
                >
                  Log out
                </button>
                <Popup />
              </$.Row>
            </$.Row>
          </div>

          <hr
            css={`
              margin: 25px 0;
              clear: both;
              border-top: solid #d3d3d3;
              border-width: 2px 0 0;
              height: 0;
            `}
          />
          <$.Row
            css={`
              justify-content: space-between;
            `}
          >
            <div>
              <$.SubTitle
                css={`
                  margin-right: 20px;
                `}
              >
                Order history
              </$.SubTitle>
              {orders.length > 0 ? (
                orders.map((ele) => ele)
              ) : (
                <p>You haven't placed any orders yet.</p>
              )}
            </div>
            <div>
              <$.SubTitle>Account details</$.SubTitle>
              {store.user?.address.length > 0 && (
                <p>
                  {Object.entries(store.user.address[0])
                    .filter(([key, val]) => key !== "_id" && val)
                    .map(([key, val], index) => (
                      <React.Fragment key={index}>
                        <span>{key !== "country" ? val : getName(val)}</span>
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              )}
              <button onClick={handleManageAddress}>
                View Addresses{" "}
                <span
                  css={`
                    letter-spacing: 1.3px;
                  `}
                >
                  ({store.user?.address.length})
                </span>
              </button>
            </div>
          </$.Row>
        </>
      ) : store.user ? (
        <AddressList handleReturn={handleManageAddress} />
      ) : null}
    </$.PageWrapper>
  );
}
/* <button onClick={handelDeleteUser}>Delete account</button>
      {deleteWarning && <span>{deleteWarning}</span>} */
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
