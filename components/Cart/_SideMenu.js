import styled from "styled-components";
import { inlineFlexCenter, textCenter } from "../../styles/reusable";

const SideMenu = styled.div`
  height: 100%;
  width: 300px;
  background: ${({ theme }) => theme.colors.primary};
  right: 0;
  position: fixed;
  padding: 0 25px 25px;
  max-width: 95%;
  border-left: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: transform 0.4s cubic-bezier(0.46, 0.01, 0.32, 1);
  z-index: 900;
  overflow-y: scroll;
  &.side-menu-transition-enter {
    display: block;
    transform: translateX(300px);
  }
  &.side-menu-transition-enter-active {
    transform: translateX(0px);
  }
  &.side-menu-transition-exit {
    transform: translateX(0px);
  }
  &.side-menu-transition-exit-active {
    transform: translateX(300px);
  }
`;

export default {
  SideMenu
};
