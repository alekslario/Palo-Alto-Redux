import { useEffect, useState, useMemo } from "react";
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
import { useFetchEntries } from "../utils/useFetchEntries";
import smoothScroll from "../utils/smoothScroll";
import CardsList from "../components/Account/CardsList";
import Orders from "../components/Account/Orders";
function Account({ user, cart, orders = [], totalOrderNumber }) {
  const [store, dispatch] = useStore();
  const [addressOverview, setAddressOverview] = useState(false);
  const [cardsOverview, setCardsOverview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      user,
      cart,
      orders,
      totalOrderNumber,
      skip: 0,
    });
  }, []);
  //to review it later

  const [] = useFetchEntries({
    "sys.id[in]": store.orders
      .reduce(
        (acc, ele) => [...acc, ...ele.products.map((prod) => prod.contentId)],
        []
      )
      .join(),
    content_type: "paloAltoProduct",
    order: "sys.createdAt",
    dependency: [store.orders],
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
      if (response?.status === 200 && !didCancel) {
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

  const handleManageAddress = () => {
    setAddressOverview((prev) => !prev);
    smoothScroll({ scrollParent: document.body });
  };
  const handleManageCards = () => {
    setCardsOverview((prev) => !prev);
    smoothScroll({ scrollParent: document.body });
  };

  return (
    <$.PageWrapper>
      {!addressOverview && !cardsOverview && (
        <>
          <div>
            <$.Column
              css={`
                @media (min-width: 768px) {
                  flex-direction: row;
                }
              `}
            >
              <$.Title>My Account</$.Title>
              <$.Row
                css={`
                  justify-content: space-between;
                  width: 100%;
                  flex-wrap: wrap;
                  button {
                    margin-bottom: 25px;
                  }
                  @media (min-width: 768px) {
                    button {
                      margin-bottom: 0;
                    }
                  }
                `}
              >
                <button
                  css={`
                    color: ${({ theme }) => theme.colors.secondary};
                    margin-right: 50px;
                  `}
                  onClick={() => dispatch({ type: "LOGOUT" })}
                >
                  Log out
                </button>
                <DeleteAccount />
              </$.Row>
            </$.Column>
          </div>

          <hr
            css={`
              margin: 0 0 25px 0;
              clear: both;
              border-top: solid #d3d3d3;
              border-width: 2px 0 0;
              height: 0;
              @media (min-width: 768px) {
                margin: 25px 0;
              }
            `}
          />
          <$.Row
            css={`
              justify-content: space-between;
              @media (max-width: 767px) {
                flex-direction: column-reverse;
              }
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
                <Orders />
              ) : (
                <p>You haven't placed any orders yet.</p>
              )}
            </div>
            <div
              css={`
                margin-bottom: 50px;
                white-space: nowrap;
              `}
            >
              <$.SubTitle>Account details</$.SubTitle>
              {store.user?.address.length > 0 && (
                <p
                  css={`
                    white-space: normal;
                  `}
                >
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
                  ({store.user?.address.length || 0})
                </span>
              </button>
              <button
                css={`
                  display: block;
                  margin-top: 5px;
                `}
                onClick={handleManageCards}
              >
                Manage Cards{" "}
                <span
                  css={`
                    letter-spacing: 1.3px;
                  `}
                >
                  ({store.user?.stripePaymentMethods.length || 0})
                </span>
              </button>
            </div>
          </$.Row>
        </>
      )}
      {addressOverview && store.user && (
        <AddressList handleReturn={handleManageAddress} />
      )}
      {cardsOverview && store.user && (
        <CardsList handleReturn={handleManageCards} />
      )}
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
        if (
          response.status === 404 ||
          response.status === 403 ||
          response.status === 401
        ) {
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
