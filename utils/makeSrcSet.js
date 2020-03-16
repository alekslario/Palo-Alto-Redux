const breakpoints = require("../public/products.json").breakpoints.sm;
export default (src, height = false) => {
  return breakpoints
    .map(
      breakpoint =>
        `${src}_${breakpoint}x.jpg ${breakpoint}w${
          height ? " " + breakpoint + "h" : ""
        }`
    )
    .join(",");
};
