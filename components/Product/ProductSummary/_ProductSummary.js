import styled from "styled-components";
import statement from "../../_App/_Statement";
const { Statement } = statement;
import { PageWrapper, H2, title } from "../../../styles/reusable";

const Wrapper = styled(PageWrapper)`
  h1 {
    ${H2}
  }
  h3 {
    ${title}
    font-size:20px;
    color: ${({ theme }) => theme.colors.beta};
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 30px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  h1 {
    font-size: 36px;
  }
`;

const Button = styled.button`
  display: block;
  width: 300px;
  max-width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme, black }) =>
    black ? theme.colors.primary : theme.colors.secondary};
  background: ${({ theme, black }) =>
    black ? theme.colors.secondary : "transparent"};
  margin-right: auto;
  text-align: center;
  font-size: 14px;
  padding: 12px 24px;
  letter-spacing: 2px;
  ${({ black }) => (black ? "margin-top:15px" : "")};
  &:hover {
    opacity: 1;
    background: ${({ theme, black }) => (black ? "" : theme.colors.secondary)};
    color: ${({ theme, black }) => (black ? "" : theme.colors.primary)};
  }
`;

const List = styled.ul`
  margin: 20px 0;
  & > li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.delta};
  }
  & > li:nth-child(1) {
    border-top: 1px solid ${({ theme }) => theme.colors.delta};
  }
`;

const QualityStatement = styled(Statement)`
  padding: 50px 0;
  @media (min-width: 768px) {
    padding: 100px 0;
  }
`;

const Faq = styled.div`
  padding: 50px 0;
  max-width: 1000px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 100px 0;
  }
`;
export default {
  Wrapper,
  Grid,
  Wrapper,
  QualityStatement,
  Button,
  List,
  Faq
};
