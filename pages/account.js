// import AccountHeader from "../components/Account/AccountHeader";
// import AccountOrders from "../components/Account/AccountOrders";
// import AccountPermissions from "../components/Account/AccountPermissions";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Account/_Account";
import { handleLogout } from "../utils/auth";
function Account({ user, orders }) {
  const [store, dispatch] = useStore();
  const router = useRouter();
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

Account.getInitialProps = async (ctx, token) => {
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  return response.data;
};

{
  /* <AccountHeader {...user} />
<AccountOrders orders={orders} />
{user.role === "root" && <AccountPermissions />}
 */
}

export default Account;
