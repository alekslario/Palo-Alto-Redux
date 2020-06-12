import styled from "styled-components";
import {
  Error,
  SubmitButton as DefaultButton,
  PageWrapper as DefaultPageWrapper,
  title,
  H2,
  Row,
  Column,
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
  letter-spacing: 3px;
  ${title}
  white-space:nowrap;
  color: ${({ theme }) => theme.colors.beta};
  margin: 0 20px 14px 0;
  display: inline-block;

  @media (min-width: 992px) {
    font-size: 36px;
    margin: 0 20px 14px 0;
  }
`;

const SubTitle = styled.h1`
  ${title}
  font-size: 20px;
  color: ${({ theme }) => theme.colors.beta};
  margin: 0 0 10px 0;
`;

const BiggerTittle = styled.div`
  ${H2}
  margin-bottom: -10px;
`;

const PageWrapper = styled(DefaultPageWrapper)`
  max-width: 1100px;
  margin: 0 auto;
`;
export default {
  Error,
  PageWrapper,
  Content,
  Title,
  BiggerTittle,
  Row,
  Column,
  SubTitle,
};
