const defaultBreakpoints = {
  breakpoints: {
    sm: [180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1950, 2048],
    lg: [295, 394, 590, 700, 800, 1000, 1200, 1500, 1800, 2000, 2048],
  },
};
const breakpoints = defaultBreakpoints.breakpoints.sm;
export default (src, height = false) => {
  return breakpoints
    .map(
      (breakpoint) =>
        `${src}_${breakpoint}x.jpg ${breakpoint}w${
          height ? " " + breakpoint + "h" : ""
        }`
    )
    .join(",");
};
