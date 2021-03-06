import { useEffect } from "react";
import cookie from "js-cookie";
import Menu from "./Menu";
import Footer from "./Footer";
import SideMenuCart from "../Cart/SideMenuCart";
import SideMenu from "../Cart/SideMenu";
import GlobalStyle from "../../styles/global";
import { useStore } from "../../utils/contextStore";
import { CSSTransition } from "react-transition-group";
import contactServer from "../../utils/contactServer";
import useScrollRestoration from "../../utils/useScrollRestoration";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Layout = ({ children, user }) => {
  const [store, dispatch] = useStore();
  const router = useRouter();
  useEffect(() => {
    if (router.route === "/account") return;
    const checkCartProduct = async () => {
      let token = cookie.get("token");
      let cart = [];
      let user = null;
      if (token) {
        const response = await contactServer({
          route: "account",
          auth: token,
          method: "GET",
        });
        //handle errors better

        if (response?.response?.status === 403) {
          dispatch({ type: "LOGOUT_WITHOUT_REDIRECT" });
          token = null;
        } else if (response.status === 200) {
          cart = response.data.cart;
          user = response.data.user;
        }
      }
      if (!token) {
        try {
          cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
          console.log(error);
        }
      }
      dispatch({ type: "DELIVER_CART", items: cart, user });
    };
    checkCartProduct();
  }, []);

  useEffect(() => {
    if (!store.cartOpen && !store.menuOpen) return;
    const handler = () => {
      if (store.cartOpen || store.menuOpen) {
        dispatch({ type: "CLOSE_SIDEBAR" });
      }
    };
    router.events.on("routeChangeComplete", handler);
    return () => router.events.off("routeChangeComplete", handler);
  }, [store.cartOpen, store.menuOpen]);

  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   const scrollTo = () => html.scrollTo(0, 0);
  //   router.events.on("routeChangeComplete", scrollTo);
  //   return () => router.events.off("routeChangeComplete", scrollTo);
  // }, []);

  // useEffect(() => {
  //   const manualScroll = () => {
  //     window.history.scrollRestoration = "manual";
  //   };
  //   router.events.on("routeChangeStart", manualScroll);
  //   return () => router.events.off("routeChangeStart", manualScroll);
  // }, []);
  useScrollRestoration();
  return (
    <>
      <Elements stripe={stripePromise}>
        {router.route !== "/checkout" ? (
          <div
            id="page"
            css={`
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: row;
            `}
          >
            <Menu user={user} />
            <div
              css={`
                height: 100%;
                width: 100%;
                position: relative;
                will-change: transform;
                ${store.menuOpen || store.cartOpen
                  ? `transform: translateX(-300px);`
                  : ""}
                transition: transform 0.4s cubic-bezier(0.46, 0.01, 0.32, 1);
              `}
            >
              <div id="main" role="main">
                {children}
              </div>
              <Footer />
            </div>
            <CSSTransition
              in={store.cartOpen}
              timeout={400}
              classNames="side-menu-transition"
              unmountOnExit
            >
              {<SideMenuCart />}
            </CSSTransition>
            <CSSTransition
              in={store.menuOpen}
              timeout={400}
              classNames="side-menu-transition"
              unmountOnExit
            >
              {<SideMenu />}
            </CSSTransition>
          </div>
        ) : (
          <>{children}</>
        )}
      </Elements>
      <GlobalStyle loggedIn={!!store.user} />
    </>
  );
};

export default Layout;
