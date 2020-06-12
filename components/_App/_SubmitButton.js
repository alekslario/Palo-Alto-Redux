import styled from "styled-components";
import { SubmitButton as DefaultButton } from "../../styles/reusable";
import { loadingPlaceHolderCss } from "../_App/LoadingPlaceholder";
const SubmitButton = styled(DefaultButton)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: ${({ theme, isLoading }) =>
    isLoading ? theme.colors.secondary : theme.colors.primary}; */
    color:white;
  svg {
    position: absolute;
  }
  &:disabled {
    ${loadingPlaceHolderCss}
    color: #00000000;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default { SubmitButton };
