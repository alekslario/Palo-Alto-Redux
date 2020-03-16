import styled from "styled-components";
import { flexCenter } from "../../styles/reusable";
const Grid = styled.div`
  padding: ${({ padding }) => padding || "0 50px"};
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const LoadingWrapper = styled.div`
  ${flexCenter}
  flex-direction:column;
`;
export default { Grid, LoadingWrapper };
