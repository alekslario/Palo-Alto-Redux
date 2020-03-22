import styled from "styled-components";
import { SubmitButton as DefaultButton } from "../../styles/reusable";

const SubmitButton = styled(DefaultButton)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isLoading }) =>
    isLoading ? theme.colors.secondary : theme.colors.primary};
  svg {
    position: absolute;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default { SubmitButton };
