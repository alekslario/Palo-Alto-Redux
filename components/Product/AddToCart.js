import React from "react";
import { useStore } from "../../utils/contextStore";
const AddToCart = ({ product }) => {
  // styles[0].fields.reducedPrice
  // styles[0].fields.reducedPriceExpiration
  const [store, dispatch] = useStore();
  const handleClick = () => dispatch();

  return <>{React.cloneElement(props.children, { onClick: handleClick })}</>;
};
export default AddToCart;
