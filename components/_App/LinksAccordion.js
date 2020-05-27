import React, { useState, useRef } from "react";
import Link from "next/link";
import $ from "./_LinksAccordion";
const LinksAccordion = ({ children, name = "Learn More", type }) => {
  const [collapsed, setCollapsed] = useState(true);
  const content = useRef(null);
  return (
    <$.Wrapper>
      <$.Button
        type={type}
        className={`${collapsed ? "collapsed" : ""}`}
        onClick={() => setCollapsed((prevState) => !prevState)}
      >
        {name}
      </$.Button>
      <$.List
        type={type}
        collapsed={collapsed}
        ref={content}
        maxheight={content.current?.scrollHeight || 0}
        css={`
          @media (min-width: 768px) {
            max-height: 100%;
          }
        `}
      >
        {children}
      </$.List>
    </$.Wrapper>
  );
};

export default LinksAccordion;
