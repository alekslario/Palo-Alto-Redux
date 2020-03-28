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
import Router from "next/router";
const Layout = ({ children, hasToken }) => {
  const [store, dispatch] = useStore();
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
    const checkCartProduct = async () => {
      let token = cookie.get("token");
      if (token) {
        const response = await contactServer({
          route: "cart",
          auth: token,
          method: "GET"
        });
        if (response.status === 403) {
          cookie.remove("token");
          token = null;
        }
      }
      if (!token) {
        try {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          dispatch({ type: "ADD_TO_CART", items: cart });
        } catch (error) {
          console.log(error);
        }
      }
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
          <Menu hasToken={hasToken} />
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

      <GlobalStyle loggedIn={hasToken} />
    </>
  );
};

export default Layout;
