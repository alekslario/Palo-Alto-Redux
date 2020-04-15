import styled from "styled-components";
import { title } from "../../styles/reusable";

const Radio = styled.div`
  position: relative;
  width: 18px;
  min-width: 18px;
  height: 18px;
  overflow: hidden;
  margin-right: 0.75em;
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 100%;
    height: 100%;
    outline: none;
  }
  span {
    pointer-events: none;
    background-color: white;
    border-color: #d9d9d9;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.checkout.colors.border};
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &::after {
      width: 4px;
      height: 4px;
      margin-left: -2px;
      margin-top: -2px;
      background-color: #fff;
      border-radius: 50%;
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transition: all 0.3s ease-in-out 0.1s;
      opacity: 0;
      transform: scale(0.2);
    }
  }
  input:checked + span {
    box-shadow: 0 0 0 10px #1990c6 inset;
    border: none;
    &::after {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
export default {
  Radio
};
