import styled, { css } from "styled-components";
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
  ${({ isLoading }) =>
    isLoading
      ? css`
          ${loadingPlaceHolderCss}
          color: #00000000;
        `
      : ""};
  &:disabled {
   background-color: ${({ theme }) => theme.colors.delta};
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default { SubmitButton };
