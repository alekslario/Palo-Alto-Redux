import $ from "./_Orders";
import { useState } from "react";
import { useStore } from "../../utils/contextStore";
import cookie from "js-cookie";
import contactServer from "../../utils/contactServer";
import Order from "./Order";
import LoadingPlaceholder from "../_App/LoadingPlaceholder";
import { itemsPerOrderPage } from "../../utils/variables";

const PaginationButton = ({ index, setActive }) => {
  const id = `pagination_button_${index * 20}`;
  return (
    <>
      <$.PaginationButton>
        <input
          type="radio"
          id={id}
          defaultChecked={index === 0}
          name="order_pagination_button"
        />
        <label htmlFor={id} onClick={() => setActive(index)}>
          {index + 1}
        </label>
      </$.PaginationButton>
    </>
  );
};
const Pagination = ({ total, loadMoreOrders }) => {
  const [active, setActive] = useState(0);
  const handleSetActive = (index) => {
    setActive(index);
    loadMoreOrders(index * itemsPerOrderPage);
  };
  return (
    <$.Pagination>
      {[...Array(Math.ceil(total / itemsPerOrderPage))]
        .map((_, index) =>
          index - 2 <= 0 ||
          Math.abs(active - index) <= 1 ||
          index >= total / itemsPerOrderPage - 2 ? (
            <PaginationButton
              index={index}
              key={index}
              setActive={handleSetActive}
            />
          ) : (
            "..."
          )
        )
        .reduce(
          (acc, el) => (acc[acc.length - 1] !== el ? (acc.push(el), acc) : acc),
          []
        )}
    </$.Pagination>
  );
};
const Orders = () => {
  const [store, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const loadMoreOrders = async (skip) => {
    if (store.ordersCache[skip])
      return dispatch({
        type: "SET_ORDERS",
        orders: store.ordersCache[skip],
      });

    setLoading(true);

    const token = cookie.get("token");
    const response = await contactServer({
      data: {
        justOrders: true,
        limit: itemsPerOrderPage,
        skip,
      },
      route: "account",
      auth: token,
      method: "GET",
    });
    if (response?.status === 200) {
      dispatch({
        type: "SET_ORDERS",
        skip,
        orders: response.data.orders,
        totalOrderNumber: response.data.totalOrderNumber,
      });
      setLoading(false);
    }
  };

  return (
    <$.Wrapper>
      <Pagination
        total={store.totalOrderNumber}
        loadMoreOrders={loadMoreOrders}
      />
      {loading &&
        [...Array(itemsPerOrderPage)].map((_, index) => (
          <$.OrderWrapper
            key={index}
            css={`
              padding: 0;
              height: 251px;
            `}
          >
            <LoadingPlaceholder
              css={`
                height: 100%;
                width: 100%;
              `}
            />
          </$.OrderWrapper>
        ))}
      {!loading &&
        store.orders.map((ele, index) => <Order order={ele} key={index} />)}
    </$.Wrapper>
  );
};
export default Orders;
