import styled from "styled-components";
import { Error, SubmitButton, PageWrapper, title } from "../../styles/reusable";

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 33.333%;
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
