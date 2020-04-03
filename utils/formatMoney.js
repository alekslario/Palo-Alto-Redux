export default $$ => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format($$ / 100);
};
