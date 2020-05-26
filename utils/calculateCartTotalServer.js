async function calculateTotal(cart) {
  const ids = Object.keys(cart);
  const records = await Product.find().where("productId").in(ids).exec();
  return records.reduce((acc, product) => {
    //check if the price is reduced
    acc +=
      (new Date().getTime() < product.reducedPriceExpiration
        ? product.reducedPrice
        : product.price) * cart[product.productId].quantity;
    return acc;
  }, 0);
}
