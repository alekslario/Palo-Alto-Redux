import { useEffect } from "react";
import { updateCartStorage } from "../../utils/updateCartStorage";
const CountChangeButton = ({ dispatch, number, productId, contentId }) => {
  const handleClick = modifier => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      modifier
    });
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      await updateCartStorage({
        productId,
        contentId,
        modifier: count - startNumber
      });
    }, 500);
    return () => clearTimeout(handler);
  }, [number]);

  return (
    <div>
      <button onClick={() => handleClick(-1)}>-</button>
      {number}
      <button onClick={() => handleClick(1)}>+</button>
    </div>
  );
};
export default CountChangeButton;
