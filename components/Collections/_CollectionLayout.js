import styled from "styled-components";
import { flexCenter, absoluteCenter } from "../../styles/reusable";

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
`;

const BreadcrumbsBlock = styled.div`
  padding: 0 70px;
  width: 100%;
  @media (max-width: 1023px) {
    ${flexCenter}
  }
`;

export default {
  Grid,
  BreadcrumbsBlock
};
