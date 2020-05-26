import { useEffect, useRef } from "react";
import cookie from "js-cookie";
import Head from "next/head";
import Menu from "./Menu";
import HeadContent from "./HeadContent";
import Footer from "./Footer";
import SideMenu from "../Cart/SideMenu";
import GlobalStyle from "../../styles/global";
import { useStore } from "../../utils/contextStore";
import { CSSTransition } from "react-transition-group";
import contactServer from "../../utils/contactServer";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Layout = ({ children, user }) => {
  const [store, dispatch] = useStore();
  const router = useRouter();
  const sideMenu = useRef(null);
  // useEffect(() => {
  //   if (typeof window === "undefined" || !store.menuOpen) return;
  //   const handler = e => {
  //     if (e.target !== sideMenu.current) {
  //       dispatch({ type: "CLOSE_MENU" });
  //     }
  //   };
  //   window.addEventListener("click", handler);
  //   return () => window.removeEventListener("click", handler);
  // }, [store.menuOpen]);
  useEffect(() => {
    console.log("layoutCartUseEffect");
    if (router.route === "/account") return;
    const checkCartProduct = async () => {
      let token = cookie.get("token");
      let cart = [];
      let user = null;
      if (token) {
        const response = await contactServer({
          route: "cart",
          auth: token,
          method: "GET",
        });
        //handle error better
        console.log("response", response);

        if (response?.response?.status === 403) {
          dispatch({ type: "LOGOUT_WITHOUT_REDIRECT" });
          token = null;
        } else if (response.status === 201 || response.status === 200) {
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

  return (
    <>
      <Head>
        <HeadContent />
        <title>Polo Alto Redux</title>
        <script type="text/javascript" src="/static/ie.js"></script>
      </Head>
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
            <div
              css={`
                height: 100%;
                width: 100%;
                position: relative;
                ${store.menuOpen ? "transform: translateX(-300px);" : ""}
                transition: transform 0.4s cubic-bezier(0.46, 0.01, 0.32, 1);
              `}
            >
              <Menu user={user} />
              <div id="header-observer" />
              <div id="main" role="main">
                {children}
              </div>
              <Footer />
            </div>
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
