import styled from "styled-components";
import { textCenter, title } from "../../styles/reusable";
const Statement = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 50px 50px;
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
  grid-gap: 25px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  div {
    justify-self: start;
    align-self: center;
    max-width: 100%;
    @media (min-width: 768px) {
      max-width: 550px;
    }
  }
  hr {
    background: #f3a293;
    display: block;
    margin: 15px auto;
    width: 66px;
    height: 2px;
    border: 0;
  }
  h1 {
    ${textCenter};
    ${title}
    color: ${({ theme }) => theme.colors.beta};
    font-size: 28px;
    display: block;
    margin: 25px 0;
    line-height: 1.06;
    @media (min-width: 992px) {
      font-size: 36px;
    }
  }
  p {
    ${textCenter};
    font-size: 14px;
  }
  img{
    width: 100%;
  display: block;
  max-width: 100%px;
  justify-self: end;
  align-self: center;
  @media (min-width: 768px) {
    max-width: 550px;
  }
  }
`;

export default { Statement };
