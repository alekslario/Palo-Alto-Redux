import styled from "styled-components";
import { Row, Column, IconButton } from "../../styles/reusable";

const SideMenuCart = styled(Column)`
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
  overflow-y: auto;
  svg {
    pointer-events: none;
  }
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

const ProductWrapper = styled.div`
  color: ${({ theme }) => theme.colors.beta};
  a {
    color: ${({ theme }) => theme.colors.beta};
  }
  button {
    color: ${({ theme }) => theme.colors.beta};
  }
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 50px;
  button {
    padding: 0 8px;
  }
  img {
    width: 100%;
  }
`;

const SubTitle = styled.h4`
  font-size: 20px;
  color: #333;
`;

const Header = styled(Row)`
  align-items: center;
  height: 70px;
  min-height: 70px;
`;
export default {
  IconButton,
  SideMenuCart,
  Row,
  Column,
  ProductWrapper,
  SubTitle,
  Header,
};
