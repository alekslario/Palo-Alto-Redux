import styled, { css } from "styled-components";
import {
  Row,
  Column,
  flexCenter,
  CheckoutClickMe,
} from "../../styles/reusable";
import { loadingPlaceHolderCss } from "../_App/LoadingPlaceholder";

const Navigation = styled(Column)`
  margin-top: 1em;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5em;
  flex-direction: column-reverse;
  @media (min-width: 750px) {
    padding-bottom: 4em;
    flex-direction: row;
    margin-top: 1.5em;
  }
`;
const ButtonBack = styled.button`
  ${flexCenter}
  ${CheckoutClickMe}
  padding-top: 1.5em;
  svg {
    fill: currentColor;
    transform: scale(-1, 1);
    display: block;
    margin: 0 auto;
  }
  @media (min-width: 750px) {
    margin-right: 1em;
    padding-top: 0;
  }
`;
export const ButtonForth = styled.button`
  background-color: ${({ theme }) => theme.checkout.colors.attention};
  background-clip: border-box;
  border: 1px transparent solid;
  border-radius: 5px;
  color: ${({ theme }) => theme.checkout.colors.background};
  font-weight: 500;
  padding: 1.7em 1.7em;
  text-align: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.checkout.colors.delta};
  }
  width: 100%;
  @media (min-width: 750px) {
    width: initial;
    padding: 1.4em 1.7em;
  }
  ${({ isLoading }) =>
    isLoading
      ? css`
          ${loadingPlaceHolderCss}
          color: #00000000;
          cursor: wait;
        `
      : ""};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.delta};
    cursor: not-allowed;
  }
`;
export default {
  Row,
  Column,
  Navigation,
  ButtonBack,
  ButtonForth,
};
