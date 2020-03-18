import styled from "styled-components";
import {
  Error,
  SubmitButton as DefaultButton,
  PageWrapper,
  title
} from "../../styles/reusable";

const Content = styled.div`
  margin: 0 auto;
  @media (min-width: 481px) {
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 33.333%;
  }
`;
const SubmitButton = styled(DefaultButton)`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  ${title}
  color:${({ theme }) => theme.colors.beta};
`;
export default {
  Error,
  SubmitButton,
  PageWrapper,
  Content,
  Title
};
