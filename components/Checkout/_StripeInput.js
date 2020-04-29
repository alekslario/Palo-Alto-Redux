import styled, { css } from "styled-components";
import { Column as DefaultColumn } from "../../styles/reusable";
import _Input from "./_Input";
const { Column, styledInput } = _Input;

const Wrapper = styled.div`
  ${styledInput}
  padding: 0.92857em 0.78571em;
  ${({ theme, focus, error }) =>
    focus && !error
      ? css`
          border-color: ${theme.checkout.colors.attention};
          box-shadow: 0 0 0 1px ${theme.checkout.colors.attention};
        `
      : ""}
  cursor: text;
`;

const Error = styled.p`
  color: ${({ theme }) => theme.checkout.colors.danger};
  margin: 0.57143em 0 0.28571em;
`;
export default {
  Wrapper,
  Error,
  Column,
};
