import styled from "styled-components";
import {
  textCenter,
  HiddenLabel,
  title,
  PageWrapper,
  PageContent,
  input,
  Error,
  SubmitButton
} from "../../styles/reusable";

const ContactPage = styled(PageContent)`
  /* h1 {
    ${title}
    color:${({ theme }) => theme.colors.beta};
  }
  ${textCenter}; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;
const Notice = styled.h2`
  ${textCenter};
  font-size: 28px;
  ${title}
  color:${({ theme }) => theme.colors.secondary};
`;
const TextArea = styled.textarea`
  ${input}
  width: 100%;
`;

export default {
  Wrapper,
  TextArea,
  Notice,
  SubmitButton,
  HiddenLabel,
  Error,
  PageWrapper,
  Wrapper,
  ContactPage
};
