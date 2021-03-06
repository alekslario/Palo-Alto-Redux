import styled from "styled-components";
import { Row, Column, CheckoutClickMe } from "../../styles/reusable";
import _Checkout from "./_Checkout";
const { H2 } = _Checkout;
const Wrapper = styled.div``;

const Table = styled(Column)`
  border-radius: 4px;
  width: 100%;
  /* padding: 0.85714em 1.14286em; */
  border: 1px solid ${({ theme }) => theme.checkout.sideColors.border};
  overflow-wrap: break-word;
`;

const FieldName = styled.div`
  color: ${({ theme }) => theme.checkout.colors.smallText};
  padding-right: 1.14286em;
  padding-bottom: 0.28571em;
  word-break: keep-all;
  white-space: nowrap;
  @media (min-width: 750px) {
    flex: 0 1 5em;
    padding-bottom: 0;
  }
`;

const Record = styled.div`
  width: 100%;
  padding-right: 1.14286em;
`;

const Action = styled.div`
  max-width: 10em;
  font-size: 0.85714em;
  button {
    ${CheckoutClickMe}
  }
`;

const Shipping = styled.div`
  padding-top: 2em;
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;

export default {
  Wrapper,
  Table,
  Row,
  Column,
  FieldName,
  Record,
  Action,
  Shipping,
  H2
};
