import styled from "styled-components";
import { Row } from "../../styles/reusable";
import _Shipping from "./_Shipping";
const { Table } = _Shipping;
import _Payment from "./_Payment";
const { Information, H2 } = _Payment;
const BillingAddress = styled.div`
  padding-top: 2em;
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;
export default {
  BillingAddress,
  Row,
  Table,
  Information,
  H2,
};
