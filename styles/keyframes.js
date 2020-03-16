import { keyframes } from "styled-components";

const fadeInListItem = keyframes`
  0% {
    margin-left: 200px;
    visibility:hidden;
    opacity:0;
  }
  1%{
    visibility:visible;
  }
  100% {
    margin-left: 0;
    opacity:1;
    visibility:visible;
  }
`;

const fadeInListItemAlt = keyframes`
  0% { 
    visibility:hidden
  }
  1% {
    visibility:visible
    opacity: 0;
    transform: scale(0);
  }

100% {
    opacity: 1;
    transform: scale(1);
    visibility:visible;
  }
`;
const fadeOutListItem = keyframes`
  0% {
    animation-delay: 0ms;
    margin-top:10px;
    opacity:1;
    visibility:visible;
  }
  90% {
    margin-top:3px;
    opacity:0;
  }
  100%{
    visibility:hidden;
  }
`;

const fadeInBox = keyframes`
  0% {
    margin-top: 30px;
    visibility:hidden;
    opacity:0;
  }
  1%{
    visibility:visible;
  }
  100% {
    opacity:1;
    margin-top: 0px;
    visibility:visible;
  }
`;
const fadeOutBox = keyframes`
  0% {
    margin-top:0px;
    opacity:1;
    visibility:visible;
  }
  100%{
    margin-top:30px;
    opacity:0;
    visibility:hidden;
  }
`;

export default {
  fadeInListItem,
  fadeOutListItem,
  fadeOutBox,
  fadeInBox,
  fadeInListItemAlt
};
