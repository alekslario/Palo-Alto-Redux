import React from "react";
import { useStore } from "../../utils/contextStore";
import contactServer from "../../utils/contactServer";
import Router from "next/router";
import cookie from "js-cookie";
const AddToCart = ({ product: { productId, contentId }, children }) => {
  // styles[0].fields.reducedPrice
  // styles[0].fields.reducedPriceExpiration
  const [store, dispatch] = useStore();
  const handleClick = async () => {
    dispatch({
      type: "ADD_TO_CART",
      items: [{ productId, contentId, quantity: 1 }]
    });
    let token = cookie.get("token");
    if (token) {
      const response = await contactServer({
        data: { payloadProducts: { [productId]: count } },
        route: "cart",
        auth: token,
        method: "PUT"
      });
      if (response.status === 403) {
        cookie.remove("token");
        token = null;
      }
    }
    if (!token) {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let productFound = false;
        const updatedCart = cart.map(ele => {
          if (ele.productId === productId) {
            ele.quantity += 1;
            productFound = true;
            return ele;
          } else {
            return ele;
          }
        });
        if (!productFound) {
          updatedCart.push({ productId, contentId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } catch (error) {
        console.log(error);
        Router.push("/login");
      }
    }
    dispatch({ type: "OPEN_MENU" });
  };

  return <>{React.cloneElement(children, { onClick: handleClick })}</>;
};
export default AddToCart;
