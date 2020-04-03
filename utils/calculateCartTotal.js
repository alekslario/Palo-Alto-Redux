import formatMoney from "./formatMoney";
const calculateCartTotal = products => {
  const stripeTotal = products.reduce((acc, el) => {
    acc += el.price * el.quantity;
    return acc;
  }, 0);
  const cartTotal = formatMoney(stripeTotal);

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
