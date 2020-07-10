export default (node) => {
  window.scroll({
    top: node.offsetTop,
    left: node.offsetLeft,
    behavior: "smooth",
  });
};
