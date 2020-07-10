import styled from "styled-components";
import { Row, Column, title } from "../../styles/reusable";
import _Shipping from "./_Shipping";
const { Table } = _Shipping;
import _Payment from "./_Payment";
const { Information, H2 } = _Payment;
const TableRow = styled(Row)`
  padding: 1.14286em;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.checkout.sideColors.border};
`;
const Header = styled(TableRow)`
  cursor: default;
  justify-content: space-between;
  span {
    color: ${({ theme }) => theme.checkout.colors.smallText};
  }
  div {
    font-weight: bold;
    font-size: 17px;
  }
`;
export default {
  Row,
  Table,
  Information,
  H2,
  Column,
  Header,
  TableRow,
};
