export default el => {
  let Rect = el.getBoundingClientRect();
  let ElTop = Rect.top;
  let ElBottom = Rect.bottom;
  let WindowHeight = window.innerHeight;
  if (window.visualViewport) {
    ElTop -= window.visualViewport.offsetTop;
    ElBottom -= window.visualViewport.offsetTop;
    WindowHeight = window.visualViewport.height;
  }
  // return ElTop >= 0 && Math.floor(ElBottom) <= WindowHeight;
  //returning true as soon as top is about to be visible
  return ElTop <= WindowHeight + 100;
};
// Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 3.0
