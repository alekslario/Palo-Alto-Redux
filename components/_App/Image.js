import React from "react";
import createContentfulSrc from "../../utils/createContentfulSrc";
export default React.memo(function MyComponent({ url, thumb = false }) {
  return !thumb ? (
    <img
      src={url + "?w=180"}
      alt=""
      className="lazyload blur-up"
      data-sizes="auto"
      data-parent-fit="cover"
      data-srcset={createContentfulSrc(url)}
    />
  ) : (
    <img
      src={url + "?w=64"}
      alt=""
      className="lazyload blur-up"
      data-sizes="auto"
      data-parent-fit="cover"
    />
  );
});
