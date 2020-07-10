export default ({
  scrollParent = window,
  to = { offsetTop: 0, offsetLeft: 0 },
}) => {
  scrollParent.scroll({
    top: to.offsetTop,
    left: to.offsetLeft,
    behavior: "smooth",
  });
};
