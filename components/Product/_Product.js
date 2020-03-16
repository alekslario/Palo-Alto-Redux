import styled from "styled-components";
import { textCenter, backgroundCover } from "../../styles/reusable";
const Link = styled.span`
  color: ${({ theme }) => theme.colors.alpha};
  font-size: ${({ size }) => size || "14px"};
  padding: 10px;
  padding-top: ${({ toppadding }) => toppadding || "10px"};
  display: block;
  align-items: center;
  ${textCenter};
`;
const Wrapper = styled.div`
  padding: 25px 20px;
  height: 100%;
  width: 100%;
  div {
    ${backgroundCover}
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 130%;
    background-color: ${({ theme }) => theme.colors.primary};
    overflow: hidden;
    object-fit: cover;
    cursor: pointer;
  }
  button {
    opacity: 0;
    background-color: #1e8998;
    color: #e6e6e6;
    padding: 10px;
    position: absolute;
    bottom: -100%;
    right: 0;
    transition: 0.3s ease 0s;
    display: block;
    width: 100%;
  }
  img {
    display: none;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  @media (min-width: 767px) {
    img {
      display: block;
    }
    div {
      background-position: -9000px -9000px;
    }
    &:hover {
      div {
        background-position: center center;
      }
      button {
        bottom: 0;
        opacity: 0.9;
      }
      img {
        opacity: 0;
      }
    }
  }
`;
export default { Wrapper, Link };
