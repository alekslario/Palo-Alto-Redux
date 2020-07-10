import styled, { css } from "styled-components";
import { Row, Column, CheckoutClickMe } from "../../styles/reusable";

const Table = styled(Column)`
  border-radius: 4px;
  width: 100%;
  padding: 0.85714em 1.14286em;
  border: 1px solid ${({ theme }) => theme.checkout.sideColors.border};
  overflow-wrap: break-word;
  strong {
    font-weight: 500;
  }
`;

export const TableRow = styled(Row)`
  ${({ theme, index }) =>
    index > 0
      ? css`
          margin-top: 0.85714em;
          padding-top: 0.85714em;
          border-top: 1px solid ${theme.checkout.sideColors.gamma};
        `
      : ""};
`;

export const TableColumn = styled(Column)`
  flex: 1;
  @media (min-width: 750px) {
    flex-direction: row;
  }
`;
export const FieldName = styled.div`
  color: ${({ theme }) => theme.checkout.colors.smallText};
  padding-right: 1.14286em;
  padding-bottom: 0.28571em;
  word-break: keep-all;
  white-space: nowrap;
  @media (min-width: 750px) {
    flex: 0 1 7em;
    padding-bottom: 0;
  }
`;

export const Record = styled.div`
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

export default {
  Table,
  Row,
  Column,
  FieldName,
  Record,
  Action,
  TableRow,
  TableColumn,
};
