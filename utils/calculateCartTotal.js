import formatMoney from "./formatMoney";
const calculateCartTotal = (products, shipping = 0) => {
  const stripeTotal =
    products.reduce((acc, el) => {
      acc += el.price * el.quantity;
      return acc;
    }, 0) + shipping;
  const cartTotal = formatMoney(stripeTotal);

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
