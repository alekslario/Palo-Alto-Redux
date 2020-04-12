import React, { useRef } from "react";
const Collapsable = ({ children, collapsed, ...rest }) => {
  const ref = useRef(null);
  return (
    <div
      {...rest}
      ref={ref}
      css={`
        max-height: ${collapsed ? "0" : `${ref.current?.scrollHeight || 0}px`};
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
      `}
    >
      {children}
    </div>
  );
};

export default Collapsable;
