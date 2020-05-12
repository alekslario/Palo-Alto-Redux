import App from "next/app";
import Layout from "../components/_App/Layout";
import { ThemeProvider } from "styled-components";
import { StoreProvider } from "../utils/contextStore";
import theme from "../styles/theme";
import "swiper/css/swiper.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import "../styles/fontawesome";
import "../utils/lazysizesImports";
function MyApp({ Component }) {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Layout>
          <Component />
        </Layout>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;
