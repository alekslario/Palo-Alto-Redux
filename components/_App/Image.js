import React from "react";
import createContentfulSrc from "../../utils/createContentfulSrc";
export default React.memo(function MyComponent({ url }) {
  return (
    <img
      src={url + "?w=180"}
      alt=""
      className="lazyload blur-up"
      data-sizes="auto"
      data-parent-fit="cover"
      data-srcset={createContentfulSrc(url)}
    />
  );
});
