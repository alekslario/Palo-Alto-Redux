import styled, { css } from "styled-components";
import { footerTitles } from "../../styles/reusable";
const Wrapper = styled.div`
  a {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${({ collapsed, maxheight }) =>
    collapsed ? "0" : `${maxheight}px`};
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  a {
    margin-bottom: 9px;
    color: ${({ theme }) => theme.colors.gamma};
  }
  @media (min-width: 768px) {
    max-height: ${({ maxheight }) => maxheight || `100%`};
  }
  & > ul,
  p:last-child {
    padding-bottom: 22px;
  }
  ${({ type, theme }) => {
    switch (type) {
      case "faq":
        return css`
          border-bottom: 1px solid #d3d3d3;
        `;

      case "features":
        return css`
          & > ul {
            list-style-type: disc;
            list-style-position: inside;
            line-height: 2;
          }
          & > ul,
          p {
            line-height: 2;
          }
        `;
    }
  }};
`;
const Button = styled.button`
  ${footerTitles}
  margin-bottom:6px;
  position: relative;
  text-align: left;
  width: 100%;
  padding: 5px 32px 5px 0;
  &::before,
  &::after {
    background: #000;
    content: "";
    height: 5px;
    position: absolute;
    top: 50%;
    right: 0;
    width: 14px;
    height: 2px;
    transition: transform 500ms ease;
  }
  &::after {
    transform-origin: center;
  }
  &.collapsed {
    &::after {
      transform: rotate(90deg);
    }
    &::before {
      transform: rotate(180deg);
    }
  }

  ${({ type, theme }) => {
    switch (type) {
      case "menu":
        return css`
          @media (min-width: 768px) {
            padding: 0;
            margin: 0 0 16px;
            width: max-content;
            &::before,
            &::after {
              display: none;
            }
          }
        `;

      case "faq":
        return css`
          padding: 20px 40px 20px 0;
          margin: 0;
          font-size: 24px;
          color: ${theme.colors.beta};
          @media (min-width: 1024px) {
            font-size: 28px;
          }
        `;
      case "features":
        return css`
          margin: 0;
          padding: 12px 0;
          font-size: 14px;
          color: ${theme.colors.alpha};
          font-family: ${theme.font_family.primary};
          font-weight: 400;
          &::after, &::before {
            background-color ${theme.colors.delta};
          }
          & > ul {
            list-style-type: circle;
          }
          `;
    }
  }};
`;
export default { Wrapper, List, Button };
