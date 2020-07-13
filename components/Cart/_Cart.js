import styled from "styled-components";
import {
  Row,
  Column,
  PageWrapper,
  title,
  IconButton,
  centerImg,
} from "../../styles/reusable";

const MainHeader = styled.h1`
  ${title}
  font-size:28px;
  margin: 0 0 14px 0;
  padding-bottom: 25px;
  color: ${({ theme }) => theme.colors.beta};
  @media (min-width: 992px) {
    font-size: 48px;
    margin: 0 0 24px 0;
    padding-bottom: 0;
  }
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const firstCellWidth = 35;
const ImageWidth = 150;
const TableRow = styled(Row)`
  color: ${({ theme }) => theme.colors.beta};
  font-size: 15px;
  a {
    color: ${({ theme }) => theme.colors.beta};
    cursor: pointer;
  }
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & > div:nth-child(1) {
    width: 6%;
    min-width: ${firstCellWidth}px;
    padding: 40px 20px 40px 0;
    @media (max-width: 767px) {
      display: none;
    }
  }
  & > div:nth-child(2) {
    width: 120px;
    height: ${ImageWidth}px;
    min-width: 120px;
    overflow: hidden;
    margin: 40px 20px;
    position: relative;
    img {
      width: 100%;
      ${centerImg}
    }
  }
  & > div:nth-child(3) {
    flex-grow: 1;
    min-width: 25%;
    flex-basis: 25%;
    padding: 40px 20px;
    font-size: 17px;
    @media (min-width: 481px) {
      font-size: 17px;
    }
  }
  & > div:nth-child(4),
  & > div:nth-child(5) {
    justify-content: center;
    width: 16%;
    padding: 40px 20px;
  }
  & > div:nth-child(6) {
    width: 16%;
    padding: 40px 0 40px 20px;
    text-align: end;
    justify-content: flex-end;
    span {
      width: 100%;
    }
  }
  & > div:nth-child(4) {
    text-align: center;
    span {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    flex-direction: Column;
    & > div:nth-child(n) {
      padding: 10px 0;
      margin: 0;
      width: auto;
      justify-content: start;
      text-align: left;
    }
    & > div:nth-child(2) {
      width: 180px;
      margin: 40px 0 10px 0;
    }
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6) {
      padding-left: 100px;
      position: relative;
    }
    & > div:nth-child(4)::before,
    & > div:nth-child(5)::before,
    & > div:nth-child(6)::before {
      content: attr(data-label);
      float: left;
      text-align: left;
      width: 100px;
      font-size: 12px;
      line-height: 22px;
      position: absolute;
      left: 0;
    }
  }
  @media (max-width: 767px) {
    width: fit-content;
    margin: 0 auto;
  }
`;

export default {
  PageWrapper,
  Row,
  Column,
  MainHeader,
  TableRow,
  IconButton,
};
