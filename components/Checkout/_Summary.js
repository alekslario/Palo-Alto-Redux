import styled from "styled-components";
import { title, overlay } from "../../styles/reusable";

const Wrapper = styled.div`
  /* position: relative;
  height:100%;
  & ::after {
    ${overlay}
    z-index:-5;
    background-color: ${({ theme }) => theme.checkout.sideColors.background};
    box-shadow: 1px 0 0
      ${({ theme }) => theme.checkout.sideColors.backgroundBorder} inset;
  } */
`;
export default {
  Wrapper
};
