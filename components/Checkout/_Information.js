import styled, { css } from "styled-components";
import { Row, Column } from "../../styles/reusable";
import _Input from "./_Input";
const { Input, Label, styledInput, styledLabel } = _Input;
const Form = styled.form``;
const ShippingAddress = styled(Column)`
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;

const Selector = styled.div`
  width: ${({ width }) => width};
  padding: 0.42857em 0;
  ${({ position }) => {
    switch (position) {
      case "left":
        return css`
          padding-right: 0.42857em;
        `;
      case "right":
        return css`
          padding-left: 0.42857em;
        `;
    }
  }};
  position: relative;
  select {
    ${styledInput}
    padding-right: 2.07143em;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  select::-ms-expand {
    display: none;
  }
  label {
    ${styledLabel}
    font-size: 0.85714em;
  }
  div {
    border-left: 1px ${({ theme }) => theme.checkout.colors.zita} solid;
    width: 2.14286em;
    height: 43%;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    margin-right: 0.42857em;
  }
  svg {
    color: #919191;
    fill: currentColor;
    position: absolute;
    margin-left: -2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    display: inline-block;
    vertical-align: middle;
  }
`;

const CheckBoxWrapper = styled(Row)`
  width: 100%;
  padding: 0.42857em 0;
  label {
    color: ${({ theme }) => theme.checkout.colors.subText};
  }
`;
export default {
  Form,
  Row,
  Column,
  ShippingAddress,
  Selector,
  CheckBoxWrapper
};
