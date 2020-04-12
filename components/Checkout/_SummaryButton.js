import styled, { css } from "styled-components";
import { title } from "../../styles/reusable";
import _Checkout from "./_Checkout";
const { Side, contentCss } = _Checkout;

const LeftBlock = styled.span`
  color: ${({ theme }) => theme.checkout.colors.attention};
  fill: currentColor;
  display: flex;
`;
const ShowMoreButton = styled.button`
  background: ${({ theme }) => theme.checkout.sideColors.background};
  border-top: 1px solid ${({ theme }) => theme.checkout.colors.gamma};
  border-bottom: 1px solid ${({ theme }) => theme.checkout.colors.gamma};
  padding: 1.25em 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  &:hover {
    opacity: 1;
    ${LeftBlock} {
      color: ${({ theme }) => theme.checkout.colors.attentionSecondary};
    }
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.checkout.colors.attention};
  }
  & > span {
    ${contentCss}
    display: flex;
    justify-content: space-between;
  }
  svg {
    display: block;
    margin: 0 auto;
  }
`;

const Total = styled.span`
  font-size: 1.28571em;
  line-height: 1em;
  display: flex;
  align-items: center;
`;

const iconPosition = css`
  height: 100%;
  display: flex;
  align-items: center;
`;
const CartIcon = styled.span`
  vertical-align: middle;
  padding-right: 0.75em;
  ${iconPosition}
`;

const CaretIcon = styled.span`
  width: 11px;
  ${iconPosition}
  svg {
    transform: ${({ collapsed }) =>
      collapsed ? "rotate(90deg)" : "rotate(-90deg)"};
    height: 100%;
    margin-top: 3px;
  }
`;

const Content = styled.div`
  ${contentCss};
  min-height: 100%;
`;

export default {
  ShowMoreButton,
  Total,
  CartIcon,
  CaretIcon,
  Side,
  Content,
  LeftBlock
};
