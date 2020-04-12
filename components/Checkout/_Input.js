import styled, { css } from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.42857em 0;
  div {
    position: relative;
  }
  @media (min-width: 750px) {
    width: ${({ width }) => width || "100%"};
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
  }
`;
//tiny 0.02 delay to remove blinking on autofill
const styledLabel = css`
  color: ${({ theme }) => theme.checkout.colors.smallText};
  transition: all 0.2s 0.02s ease-out;
  font-weight: normal;
  position: absolute;
  width: 100%;
  margin-top: 0.42857em;
  margin-left: 1px;
  padding: 0 0.91667em;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;
const Label = styled.label`
  ${styledLabel}
  left: -1px;
  top: ${({ value }) => (value ? "0" : "0.5em")};
  font-size: ${({ value }) => (value ? "0.85714em" : "inherit")};
`;

const styledInput = css`
  transition: all 0.2s ease-out;
  background-color: ${({ theme }) => theme.checkout.colors.background};
  color: ${({ theme }) => theme.checkout.colors.text};
  border: 1px ${({ theme }) => theme.checkout.colors.border} solid;
  border-radius: 5px;
  background-clip: padding-box;
  width: 100%;
  padding: 1.5em 0.78571em 0.35714em;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.checkout.colors.attention};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.checkout.colors.attention};
  }
`;
const Input = styled.input`
   ${styledInput}
  padding: ${({ value }) =>
    value ? "1.5em 0.78571em 0.35714em;" : "0.92857em 0.78571em;"};
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    padding:1.5em 0.78571em 0.35714em;
    & ~ label {
      top: 0;
      font-size:0.85714em;
    }
  }
`;
export default {
  Wrapper,
  Input,
  Label,
  styledInput,
  styledLabel
};
