import React from "react";
import { useStore } from "../../utils/contextStore";
import { useRouter } from "next/router";

const AddToCart = ({
  product: { productId, contentId },
  checkout = false,
  children,
}) => {
  // styles[0].fields.reducedPrice
  // styles[0].fields.reducedPriceExpiration
  const [_, dispatch] = useStore();
  const router = useRouter();
  const handleClick = () => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      contentId,
      modifier: 1,
    });
    checkout ? router.push("/checkout") : dispatch({ type: "OPEN_CART" });
  };

  return <>{React.cloneElement(children, { onClick: handleClick })}</>;
};
export default AddToCart;
