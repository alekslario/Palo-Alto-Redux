import styled, { css } from "styled-components";
import { Row, Column } from "../../styles/reusable";
import _Input from "./_Input";
const {
  styledInput,
  styledLabel,
  Wrapper,
  Column: SelectorWrapper,
  Error
} = _Input;

const Selector = styled(Wrapper)`
  width: 100%;
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
    color: ${({ theme }) => theme.checkout.colors.kappa};
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

export default {
  Row,
  Column,
  Selector,
  SelectorWrapper,
  Error
};
