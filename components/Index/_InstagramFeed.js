import styled from "styled-components";
import { backgroundCover, flexCenter, textCenter } from "../../styles/reusable";
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 767px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;
const Img = styled.a`
  display: block;
  ${backgroundCover}
  padding-top:100%;
  width: 100%;
  font-size: 14px;
  svg {
    font-size: 19px;
  }
  div {
    display: none;
    opacity: 0;
    position: absolute;
    background-color: rgba(255, 57, 101, 0.95);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    ${textCenter};
    padding: 20px;
  }
  div:hover {
    opacity: 1;
  }
  @media (min-width: 992px) {
    div {
      ${flexCenter}
    }
  }
`;
export default { Grid, Img };
