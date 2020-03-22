import styled from "styled-components";
import {
  Error,
  SubmitButton as DefaultButton,
  PageWrapper,
  title,
  H2
} from "../../styles/reusable";

const Content = styled.div`
  margin: 0 auto;
  ${({ position }) => (position ? `position:${position};` : "")};
  @media (min-width: 481px) {
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 33.333%;
  }
`;

const Title = styled.h1`
  ${title}
  color:${({ theme }) => theme.colors.beta};
`;

const BiggerTittle = styled.div`
  ${H2}
  margin-bottom: -10px;
`;
export default {
  Error,
  PageWrapper,
  Content,
  Title,
  BiggerTittle
};
