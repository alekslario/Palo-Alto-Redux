import styled from "styled-components";
import {
  inlineFlexCenter,
  textCenter,
  IconButton
} from "../../styles/reusable";

const Wrapper = styled.div`
  ${inlineFlexCenter}
  a {
    ${inlineFlexCenter}
    margin-right: 40px;
    color: ${({ lightTheme, theme }) =>
      lightTheme ? theme.colors.primary : theme.colors.secondary};
  }
`;

const DesktopLinks = styled(Wrapper)``;

const MobileLinks = styled(Wrapper)`
  flex-wrap: wrap;
  svg {
    font-size: 22px;
  }
  button {
    color: ${({ lightTheme, theme }) =>
      lightTheme ? theme.colors.primary : theme.colors.secondary};
    padding: 6px 10px;
    line-height: 1;
    margin-right: 10px;
  }
`;

const Menu = styled.div`
  position: ${({ position }) => position};
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-between;
  padding: 15px 25px;
  z-index: 99;
  @media (min-width: 480px) {
    padding: 15px 55px;
  }
  @media (min-width: 1024px) {
    ${MobileLinks} {
      display: none;
    }
  }
  @media (max-width: 1023px) {
    ${DesktopLinks} {
      display: none;
    }
  }
`;

const CartButton = styled.button`
  height: 27px;
  width: 22px;
  margin-bottom: 4px;
  margin-left: 20px;
  ::after {
    ${textCenter};
    line-height: normal;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    top: -10px;
    right: -10px;
    display: block;
    content: attr(data-size);
    height: 17px;
    width: 17px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.attention};
  }
`;

export default {
  Menu,
  Wrapper,
  CartButton,
  DesktopLinks,
  MobileLinks,
  IconButton
};
