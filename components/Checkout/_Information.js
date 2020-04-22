import styled, { css } from "styled-components";
import { Row, Column, CheckoutClickMe } from "../../styles/reusable";
import _Checkout from "./_Checkout";
const { H2 } = _Checkout;
const Form = styled.form`
  a {
    ${CheckoutClickMe}
  }
`;
const ShippingAddress = styled(Column)`
  padding-top: 2em;
  @media (min-width: 750px) {
    padding-top: 3em;
  }
`;

const CheckBoxWrapper = styled(Row)`
  width: 100%;
  padding: 0.42857em 0;
  label {
    color: ${({ theme }) => theme.checkout.colors.subText};
  }
`;
export default {
  Form,
  Row,
  Column,
  ShippingAddress,
  CheckBoxWrapper,
  H2
};
