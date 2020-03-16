import { useEffect, useRef } from "react";
import Head from "next/head";
import Menu from "./Menu";
import HeadContent from "./HeadContent";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import GlobalStyle from "../../styles/global";
import { useStore } from "../../utils/contextStore";

const Layout = ({ children, user }) => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined" || !store.menuOpen) return;
    const handler = e => {
      if (e.target !== sideMenu.current) {
        dispatch({ type: "CLOSE_MENU" });
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [store.menuOpen]);

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
          <Menu user={user} />
          <div id="header-observer" />
          <div id="main" role="main">
            {children}
          </div>
          <Footer />
        </div>
        <SideMenu />
      </div>

      <GlobalStyle />
    </>
  );
};

export default Layout;
