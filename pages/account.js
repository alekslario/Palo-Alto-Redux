import { useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import { redirectUser, handleLogout } from "../utils/auth";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Account/_Account";
function Account({ user }) {
  const [store, dispatch] = useStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event) => {
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
        My Account <button onClick={handleLogout}>Log out</button>
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
          <h2>Account details</h2>
          <div>details</div>
          <button>View Addresses</button>
        </div>
      </div>
    </$.PageWrapper>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    redirectUser(ctx, "/login");
  } else {
    try {
      const payload = { headers: { Authorization: token } };
      const url = `${baseUrl}/api/account`;
      const response = await axios.get(url, payload);
      return { props: { user: response.data } };
    } catch (error) {
      console.error("Error getting current user", error);
      // 1) Throw out invalid token
      destroyCookie(ctx, "token");
      // 2) Redirect to login
      redirectUser(ctx, "/login");
    }
  }
  return {};
}

export default Account;
