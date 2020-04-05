import styled from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.ul`
  grid-area: navigation;
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  padding-bottom: 2em;
  span {
    margin: 0 0.64286em;
    display: block;
    width: 10px;
  }
`;

const BreadCrumb = styled.li`
  button,
  a {
    font-size: 0.85714em;
    transition: color 0.2s ease-in-out;
    ${({ isActive, theme }) =>
      isActive
        ? `color:${theme.checkout.colors.text};cursor:text;`
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
`;
export default {
  Wrapper,
  BreadCrumb
};
