import React from "react";
import { useStore } from "../../utils/contextStore";
import { updateCartStorage } from "../../utils/updateCartStorage";

const AddToCart = ({ product: { productId, contentId }, children }) => {
  // styles[0].fields.reducedPrice
  // styles[0].fields.reducedPriceExpiration
  const [store, dispatch] = useStore();
  const handleClick = () => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      contentId,
      modifier: 1
    });
    dispatch({ type: "OPEN_MENU" });
  };

  return <>{React.cloneElement(children, { onClick: handleClick })}</>;
};
export default AddToCart;
