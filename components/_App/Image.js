import React from "react";
import createContentfulSrc from "../../utils/createContentfulSrc";
export default React.memo(function MyComponent({
  url,
  thumb = false,
  className,
  ...rest
}) {
  return !thumb ? (
    <img
      src={url + "?w=180"}
      alt=""
      className={`${className} lazyload blur-up`}
      data-sizes="auto"
      data-parent-fit="cover"
      data-srcset={createContentfulSrc(url)}
      {...rest}
    />
  ) : (
    <img
      src={url + "?w=100"}
      alt=""
      className={`${className} lazyload blur-up`}
      data-sizes="auto"
      data-parent-fit="cover"
      {...rest}
    />
  );
});
