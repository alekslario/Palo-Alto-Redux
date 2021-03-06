import styled, { keyframes } from "styled-components";

const spinCircle = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

const Circle = styled.div`
  display: inline-block;
  transform: translateZ(1px);
  & > div {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 8px;
    border-radius: 50%;
    background: #fff;
    animation: ${spinCircle} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    border: 1px #7b7b7b solid;
  }
`;

export default { Circle };
