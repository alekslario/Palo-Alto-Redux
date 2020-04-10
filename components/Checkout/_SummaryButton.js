import styled, { css } from "styled-components";
import { title } from "../../styles/reusable";

const ShowMoreButton = styled.button`
  background: ${({ theme }) => theme.checkout.sideColors.background};
  border-top: 1px solid ${({ theme }) => theme.checkout.colors.gamma};
  border-bottom: 1px solid ${({ theme }) => theme.checkout.colors.gamma};
  padding: 1.25em 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 1000px) {
    display: none;
  }
  & > span {
    margin: 0 auto;
    max-width: 40em;
    padding: 0 1em;
    width: 100%;
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
    transform: rotate(90deg);
    height: 100%;
  }
`;

export default { ShowMoreButton, Total, CartIcon, CaretIcon };
