import styled, { keyframes, css } from "styled-components";

const background = keyframes`
 0%{
        background-position: -468px 0;
    }
    100%{
        background-position: 468px 0;
    }
`;
export const loadingPlaceHolderCss = css`
  background-color: #eee;
  animation: infinite linear 1.25s forwards ${background};
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: calc(100vh * 2) 100vh;
`;
// background-size: calc(100% * 5) calc(100% * 3);
const LoadingPlaceholder = styled.div`
  ${loadingPlaceHolderCss}
`;
export default LoadingPlaceholder;
