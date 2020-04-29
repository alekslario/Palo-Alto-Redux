import styled from "styled-components";
import { Row, Column } from "../../styles/reusable";
import _Checkout from "./_Checkout";
const { H2 } = _Checkout;
import _Shipping from "./_Shipping";
const { Table } = _Shipping;
const Wrapper = styled.div`
  h2 {
    margin-bottom: 0.6em;
  }
  @media (min-width: 750px) {
    padding-top: 3em;
    h2 {
      margin-bottom: 0.6em;
    }
  }
`;
const BillingAddress = styled.div`
  padding-top: 2em;
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;

const Payment = styled.div`
  padding-top: 2em;
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;

const Information = styled.div`
  margin-bottom: 1em;
  @media (min-width: 750px) {
    margin-bottom: 1.5em;
  }
  p {
    margin: 0;
  }
`;

const Warning = styled(Row)`
  background-color: #fff8de;
  margin-bottom: 0.6em;
  padding: 1em;
  border-radius: 4px;
  border: 1px solid #f0e4bc;
  color: #545454;
  align-items: center;
  svg {
    max-width: 100%;
    fill: #b88600;
  }
  span {
    width: 24px;
    height: 24px;
    display: block;
    margin-right: 0.71429em;
    min-width: 24px;
  }
`;
export default {
  Wrapper,
  BillingAddress,
  H2,
  Row,
  Column,
  Table,
  Payment,
  Information,
  Warning,
};
