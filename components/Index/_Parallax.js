import styled from "styled-components";
import {
  backgroundCover,
  flexCenter,
  textCenter,
  title
} from "../../styles/reusable";

const Parallax = styled.div`
  ${flexCenter}
  -webkit-font-smoothing: antialiased;
  ${backgroundCover}
  background-attachment: initial;
  height: 100vh;
  width: 100%;
  position: relative;
  div {
    position: relative;
    z-index: 6;
  }
  &::after {
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  @media (min-width: 767px) {
    background-attachment: fixed;
  }
  h1,
  h2 {
    ${textCenter};
    color: ${({ theme }) => theme.colors.primary};
    display: block;
    font-style: normal;
    margin: 0 0 5px;
    line-height: 1.08;
  }
  h1 {
    font-size: 29px;
    ${title}
  }
  h2 {
    font-size: 18px;
    font-weight: 400;
  }
  @media (min-width: 481px) {
    h1 {
      font-size: 38px;
    }
    h2 {
      font-size: 20px;
    }
  }
  @media (min-width: 992px) {
    h1 {
      font-size: 48px;
    }
  }
`;

export default { Parallax };
