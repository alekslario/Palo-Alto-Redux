import { useEffect, useState } from "react";
import { redirectUser, handleLogout } from "../utils/auth";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Account/_Account";
const { getName } = require("country-list");
import AddressList from "../components/Account/AddressList";
import cookie from "js-cookie";
import contactServer from "../utils/contactServer";
import DeleteAccount from "../components/Account/PopUp";
import Order from "../components/Account/Order";
import { useFetchEntries } from "../utils/useFetchEntries";
function Account({ user, cart, orders = [] }) {
  const [store, dispatch] = useStore();
  const [addressOverview, setAddressOverview] = useState(false);
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: "SET_USER", user, cart, orders });
  }, []);

  const [] = useFetchEntries({
    "sys.id[in]": orders
      .reduce(
        (acc, ele) => [...acc, ...ele.products.map((prod) => prod.contentId)],
        []
      )
      .join(),
    content_type: "paloAltoProduct",
    order: "sys.createdAt",
  });

  useEffect(() => {
    //merging possible local storage cart with database

    if (!user) return;
    let didCancel = false;
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.log(error);
    }
    // if local storage doesn't contain a cart the hook is terminated early
    if (cart.length === 0) return;
    async function mergeCart() {
      const token = cookie.get("token");
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
        method: "POST",
      });
      if (response?.status === 200) {
        localStorage.removeItem("cart");
        dispatch({ type: "DELIVER_CART", items: response.data.cart });
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
                    color: ${({ theme }) => theme.colors.secondary};
                  `}
                  onClick={() => dispatch({ type: "LOGOUT" })}
                >
                  Log out
                </button>
                <DeleteAccount />
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
            <div
              css={`
                width: 100%;
              `}
            >
              <$.SubTitle
                css={`
                  margin-right: 20px;
                `}
              >
                Order history
              </$.SubTitle>
              {store.orders.length > 0 ? (
                store.orders.map((ele, index) => (
                  <Order order={ele} key={index} />
                ))
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

let cache = {};
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    redirectUser(ctx, "/login");
  } else {
    if (cache["user"]) {
      console.log("returning cache");
      return { props: { ...cache } };
    } else {
      try {
        const response = await contactServer({
          data: {
            includeOrders: true,
          },
          route: "account",
          auth: token,
          method: "GET",
        });
        if (response.status === 404) {
          throw "Error getting current user";
        } else {
          cache = { ...response.data };
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
  }
  return { props: {} };
}

export default Account;
