import React, { useRef } from "react";
import $ from "./_Shipping";
import formatMoney from "../../utils/formatMoney";
import { css } from "styled-components";
import RadioPick from "./Radio";
import Table from "./Table";
const infoDef = {
  Contact: "aleksandlario@gmail.com",
  "Ship to":
    "303 BURGES ROAD, EAST HAM, LONDON., London, E6 2ES, United Kingdom",
  Method: ""
};
const Shipping = ({ info = infoDef }) => {
  const shipping = useRef(null);
  return (
    <$.Wrapper>
      <$.Shipping>
        <$.H2>Shipping Method</$.H2>
        <$.Table
          css={`
            padding: 1.14286em;
          `}
        >
          <$.Row
            css={`
              justify-content: space-between;
            `}
          >
            <$.Row>
              <RadioPick
                id="shippingINT"
                name="radio-shipping"
                defaultChecked={true}
              />
              <label
                htmlFor="shippingINT"
                css={`
                  color: #545454;
                `}
              >
                International Shipping
              </label>
            </$.Row>
            <span
              css={`
                font-weight: 500;
                padding-left: 0.75em;
                white-space: nowrap;
              `}
            >
              {formatMoney(2000)}
            </span>
          </$.Row>
        </$.Table>
      </$.Shipping>
    </$.Wrapper>
  );
};

export default Shipping;
