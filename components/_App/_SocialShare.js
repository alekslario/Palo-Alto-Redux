import styled from "styled-components";
import { textStart } from "../../styles/reusable";
const SocialIcons = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.secondary};
  ${textStart};

  a {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0 5px;
    &:first-child {
      margin-left: 0;
    }
  }
  svg {
    display: inline-block;
  }
`;
export default { SocialIcons };
