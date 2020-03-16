import styled from "styled-components";
import {
  backgroundCover,
  textStart,
  H1,
  textCenter,
  title
} from "../../styles/reusable";

const Grid = styled.div`
  max-width: 100%;
  padding: 0 25px;
  margin-top: 50px;
  @media (min-width: 480px) {
    padding: 0 50px 50px;
    width: calc(100vw - 100px);
  }
  @media (min-width: 768px) {
    width: calc((100vw - 100px) * 0.9);
    margin: 50px auto 0;
  }
  @media (min-width: 1024px) {
    width: calc(50% + 40px);
  }
`;
const Img = styled.div`
  display: block;
  ${backgroundCover}
  padding-top:100%;
  font-size: 14px;
  position: relative;
  /* overlay */
  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  h3 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 25px;
    margin: 0;
  }
  span {
    color: ${({ theme }) => theme.colors.primary};
    ${textStart};
    ${title}
    font-size:22px;
    display: block;
    width: 100%;
    position: relative;
    line-height: 1.4;
  }
  span::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.25s ease-in;
  }
  &:hover span::after {
    width: 100%;
  }

  @media (min-width: 480px) {
    padding-top: 56%;
  }
`;

const Header = styled.header`
  background: #fafafa;
  padding: 85px 0px 50px 0px;
  ${textCenter};
  max-width: 100%;
  margin: 0 auto;
  h1 {
    ${H1}
    color: ${({ theme }) => theme.colors.beta};
    line-height: 1.4;
    @media screen and (min-width: 768px) {
      margin-bottom: 20px;
    }
  }
`;
export default {
  Grid,
  Img,
  Header
};
