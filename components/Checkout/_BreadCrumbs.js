import styled from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.ul`
  grid-area: navigation;
  display: flex;
  flex-direction: row;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  flex-wrap: wrap;
  span {
    margin: 0 0.64286em;
    display: block;
    width: 10px;
  }
  @media (min-width: 1000px) {
    padding-top: 1em;
    padding-bottom: 2em;
  }
`;

const BreadCrumb = styled.li`
  button,
  a {
    font-size: 0.85714em;
    transition: color 0.2s ease-in-out;
    ${({ isActive, theme }) =>
      isActive
        ? `color:${theme.checkout.colors.text};cursor:text;font-weight: 500;`
        : `color:${theme.checkout.colors.attention};cursor:pointer;`}
  }
  button :hover,
  a :hover {
    opacity: 1;
    ${({ isActive, theme }) =>
      !isActive ? `color:${theme.checkout.colors.attentionSecondary}` : ""};
  }
  svg {
    color: ${({ theme }) => theme.checkout.colors.smallText};
    fill: currentColor;
  }
  button:disabled {
    color: ${({ theme }) => theme.checkout.colors.smallText};
    cursor: text;
  }
`;
export default {
  Wrapper,
  BreadCrumb
};
