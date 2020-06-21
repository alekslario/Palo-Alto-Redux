import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
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

      <CSSTransition
        in={!collapsed}
        timeout={400}
        classNames="side-dropdown-transition"
      >
        {
          <$.List
            type={type}
            collapsed={collapsed}
            ref={content}
            maxheight={content.current?.scrollHeight || 0}
          >
            {children}
          </$.List>
        }
      </CSSTransition>
    </$.Wrapper>
  );
};

export default LinksAccordion;
