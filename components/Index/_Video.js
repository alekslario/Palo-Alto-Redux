import styled, { keyframes } from "styled-components";
import {
  inlineFlexCenter,
  textCenter,
  title,
  flexCenter,
  IconButton,
  Row,
} from "../../styles/reusable";

const fadeIn = keyframes`
 0% {
    opacity:0;
  }

  100% {
    opacity:1;
  }
`;

const Nav = styled.div`
  ${inlineFlexCenter}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  padding: 28px 67px 0 0;
  z-index: 2;
  justify-content: flex-end;
  background-color: white;
`;

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  overflow-y: auto;
  z-index: 999999999;
  top: 0;
  padding: 72px 50px 50px 50px;
  ${flexCenter}
  justify-content:flex-start;
  flex-direction: column;
  overflow-y: scroll;
  animation: ${fadeIn} 0.3s forwards;
`;

export default { IconButton, Wrapper, Nav };
