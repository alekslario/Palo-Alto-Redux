import styled from "styled-components";
import { title, Row, Column } from "../../styles/reusable";

const Wrapper = styled.div``;

const Table = styled(Column)`
  border-radius: 4px;
  width: 100%;
  padding: 0.85714em 1.14286em;
  border: 1px solid ${({ theme }) => theme.checkout.sideColors.border};
`;
export default {
  Wrapper,
  Table,
  Row,
  Column
};
