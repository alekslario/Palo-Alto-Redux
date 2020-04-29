import styled, { css } from "styled-components";
import { Column as DefaultColumn } from "../../styles/reusable";

const Column = styled(DefaultColumn)`
  width: 100%;
  padding: 0.42857em 0;
  @media (min-width: 750px) {
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
const Wrapper = styled.div`
  width: 100%;
  div {
    position: relative;
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
  border: 1px
    ${({ theme, error }) =>
      error ? theme.checkout.colors.danger : theme.checkout.colors.border}
    solid;
  border-radius: 5px;
  background-clip: padding-box;
  width: 100%;
  padding: 1.5em 0.78571em 0.35714em;
  outline: none;
  ${({ theme, error }) =>
    error
      ? css`
          box-shadow: 0 0 0 1px ${theme.checkout.colors.danger};
        `
      : ""}
  &:focus {
    ${({ theme, error }) =>
      error
        ? ""
        : css`
            border-color: ${theme.checkout.colors.attention};
            box-shadow: 0 0 0 1px ${theme.checkout.colors.attention};
          `}
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

const Error = styled.p`
  color: ${({ theme }) => theme.checkout.colors.danger};
  margin: 0.57143em 0 0.28571em;
`;
export default {
  Wrapper,
  Input,
  Label,
  styledInput,
  styledLabel,
  Error,
  Column,
};
