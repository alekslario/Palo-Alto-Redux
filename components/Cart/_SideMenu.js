import styled from "styled-components";
import { Row, Column, IconButton } from "../../styles/reusable";
import _SideMenuCart from "./_SideMenuCart";
const { SideMenuCart, Header: CartHeader } = _SideMenuCart;

const Header = styled(CartHeader)`
  button {
    margin-left: auto;
  }
`;

const SideMenu = styled(SideMenuCart)`
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.beta};
    display: block;
  }
  & li {
    padding: 5px 0;
    margin-bottom: 7px;
  }
`;
const MainLink = styled.a`
  font-size: 22px;
`;
export default {
  IconButton,
  SideMenu,
  Row,
  Column,
  Header,
  MainLink,
};
