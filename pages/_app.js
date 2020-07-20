import Layout from "../components/_App/Layout";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { StoreProvider } from "../utils/contextStore";
import theme from "../styles/theme";
import "swiper/css/swiper.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import "../styles/fontawesome";
import "../utils/lazysizesImports";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Playfair+Display:700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://cdn.shopify.com/s/files/1/1149/2354/files/logo_16x.png"
        />
        <title>Polo Alto Redux</title>
        <script type="text/javascript" src="/ie.js"></script>
      </Head>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
