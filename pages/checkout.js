import { useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Checkout/_Checkout";
import { handleLogout } from "../utils/auth";
function Checkout({ user, orders }) {
  const [store, dispatch] = useStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = event => {
      if (event.key === "logout") {
        router.push("/login");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <$.PageWrapper>
      <h1
        css={`
          padding-bottom: 20px;
        `}
      >
        My Checkout <button onClick={handleLogout}>Log out</button>
      </h1>
      <br />
      <div
        css={`
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        `}
      >
        <div>
          <h2>Order history</h2>
          <div></div>
        </div>
        <div>
          <h2>Checkout details</h2>
          <div>details</div>
          <button>View Addresses</button>
        </div>
      </div>
    </$.PageWrapper>
  );
}

Checkout.getInitialProps = async (ctx, token) => {
  if (!token) {
    return {};
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/account`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Checkout;
