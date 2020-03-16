import styled from "styled-components";
import { inlineFlexCenter, absoluteCenter } from "../../styles/reusable";

const Wrapper = styled.div`
  hr {
    margin: 50px 0;
    clear: both;
    border-top: solid ${({ theme }) => theme.colors.delta};
    border-width: 2px 0 0;
  }
  p {
    margin-top: 5px;
  }
`;

export default { Wrapper };
