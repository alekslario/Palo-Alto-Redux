import styled from "styled-components";
import {
  textCenter,
  PageWrapper,
  PageContent,
  title
} from "../../styles/reusable";

const Wrapper = styled(PageWrapper)``;

const AboutBlock = styled(PageContent)`
  img {
    width: 100%;
    margin: 50px 0;
  }
  h1 {
    ${title}
    color:${({ theme }) => theme.colors.beta};
  }
  ${textCenter};
`;

export default { Wrapper, AboutBlock };
