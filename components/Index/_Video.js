import styled, { keyframes } from "styled-components";
import {
  inlineFlexCenter,
  textCenter,
  title,
  flexCenter,
  Column,
  IconButton as DefaultIconButton,
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

const IconButton = styled(DefaultIconButton)`
  position: absolute;
  z-index: 999;
  background-color: #272424;
  border-radius: 10px;
  overflow: hidden;
  padding: 7px;
  width: 17px;
  height: 17px;
  top: 8px;
  right: 8px;
  border: 5px solid #272424;
  box-sizing: content-box;
  svg {
    fill: #fff;
  }
  &:hover {
    opacity: 1;
    background-color: #484343;
    border: 5px solid #484343;
  }
`;
const Wrapper = styled(Column)`
  overscroll-behavior: contain;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #00000040;
  z-index: 1000;
  justify-content: center;
  animation: ${fadeIn} 0.3s forwards;
`;

const VideoContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  max-width: 1000px;
`;

export default { IconButton, Wrapper, VideoContainer };
