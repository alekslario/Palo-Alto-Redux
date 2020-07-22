import styled, { css } from "styled-components";
import { Column, Row, hidden, flexCenter } from "../../styles/reusable";
import { Wrapper as OrderWrapper } from "./_Order";
const Wrapper = styled(Column)``;

const PaginationButton = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  margin:5px;
  input {
    ${hidden}
  }
  label {
    ${flexCenter}
    height: 100%;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }
  input:checked + label {
    opacity: 1;
    color: white;
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
  input:checked + label:hover {
    opacity: 0.9;
    box-shadow: 0 1px 6px 0 rgba(32,33,36,0.5);
`;
const Pagination = styled(Row)`
  user-select: none;
  font-weight: bold;
  width: min-content;
  font-size: 18px;
  background: #fdfdfd;
  padding: 15px 20px;
  border-radius: 10px;
  color: #00000069;
  margin: 15px 0;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  position: sticky;
  z-index: 19;
  top: 20px;
  width: fit-content;
  flex-wrap: wrap;
`;
export default {
  Wrapper,
  Column,
  Row,
  PaginationButton,
  Pagination,
  OrderWrapper,
};
