import React, { useState } from "react";
import $ from "./_SummaryButton";
import CartIcon from "../Icons/Cart";
import CaretIcon from "../Icons/Caret";
import Collapsable from "../_App/Collapsable";
import Summary from "./Summary";
const SummaryButton = ({ cartTotal, products, shipping }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleClick = () => setCollapsed(prevState => !prevState);
  return (
    <>
      <$.ShowMoreButton onClick={handleClick}>
        <span>
          <$.LeftBlock>
            <$.CartIcon>
              <CartIcon />
            </$.CartIcon>
            <span
              css={`
                padding-right: 0.25em;
              `}
            >
              {collapsed ? "Show order summary" : "Hide order summary"}
            </span>
            <$.CaretIcon collapsed={collapsed}>
              <CaretIcon />
            </$.CaretIcon>
          </$.LeftBlock>
          <$.Total>{cartTotal}</$.Total>
        </span>
      </$.ShowMoreButton>
      <Collapsable collapsed={collapsed}>
        <$.Content>
          <$.Side>
            <Summary
              cartTotal={cartTotal}
              products={products}
              shipping={shipping}
            />
          </$.Side>
        </$.Content>
      </Collapsable>
    </>
  );
};

export default SummaryButton;
