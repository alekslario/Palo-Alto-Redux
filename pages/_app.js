import App from "next/app";
import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import { StoreProvider } from "../utils/contextStore";
import theme from "../styles/theme";
import "swiper/css/swiper.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;
import {
  faTwitter,
  faFacebookSquare,
  faInstagram,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import { faPlayCircle, faComment } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(
  faTwitter,
  faFacebookSquare,
  faInstagram,
  faPinterest,
  faPlayCircle,
  faBars,
  faCheck,
  faComment
);

if (
  typeof window !== "undefined" &&
  !("object-fit" in document.createElement("a").style)
) {
  require("lazysizes/plugins/object-fit/ls.object-fit");
}
if (typeof window !== "undefined") {
  require("lazysizes/plugins/bgset/ls.bgset");
}
if (
  typeof window !== "undefined" &&
  (!window.HTMLPictureElement ||
    !("sizes" in document.createElement("img")) ||
    window.navigator.userAgent.indexOf("Edge/") > -1)
) {
  require("lazysizes/plugins/respimg/ls.respimg");
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // if (!token) {
    //   const isProtectedRoute =
    //     ctx.pathname === "/account" || ctx.pathname === "/create";
    //   if (isProtectedRoute) {
    //     redirectUser(ctx, "/login");
    //   }
    // } else {
    //   try {
    //     const payload = { headers: { Authorization: token } };
    //     const url = `${baseUrl}/api/account`;
    //     const response = await axios.get(url, payload);
    //     const user = response.data;
    //     const isRoot = user.role === "root";
    //     const isAdmin = user.role === "admin";
    //     // if authenticated, but not of role 'admin' or 'root', redirect from '/create' page
    //     const isNotPermitted =
    //       !(isRoot || isAdmin) && ctx.pathname === "/create";
    //     if (isNotPermitted) {
    //       redirectUser(ctx, "/");
    //     }
    //     pageProps.user = user;
    //   } catch (error) {
    //     console.error("Error getting current user", error);
    //     // 1) Throw out invalid token
    //     destroyCookie(ctx, "token");
    //     // 2) Redirect to login
    //     redirectUser(ctx, "/login");
    //   }
    // }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      console.log("logged out from storage");
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
