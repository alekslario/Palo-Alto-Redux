import styled from "styled-components";
import { Row, Column, centerImg } from "../../styles/reusable";

export const ImageWrapper = styled.div`
  width: 4.6em;
  height: 4.6em;
  background: ${({ theme }) => theme.checkout.sideColors.primary};
  position: relative;
  border-radius: 8px;
  border: 1px ${({ theme }) => theme.checkout.sideColors.border} solid;
  overflow: hidden;
  img {
    width: 100%;
    ${centerImg}
  }
`;
const Products = styled.div`
  margin-bottom: 1.5em;
  & > div {
    margin-top: 1em;
  }
  @media (max-width: 999px) {
    padding-top: 0.75em;
  }
  @media (min-width: 1000px) {
    max-height: 52vh;
    overflow: auto;
    min-height: 98px;
  }
`;

export const Quantity = styled.span`
  display: block;
  position: absolute;
  font-size: 0.85714em;
  font-weight: 500;
  line-height: 1.75em;
  white-space: nowrap;
  text-align: center;
  border-radius: 1.75em;
  background-color: ${({ theme }) => theme.checkout.sideColors.badge};
  color: ${({ theme }) => theme.checkout.sideColors.primary};
  min-width: 1.75em;
  height: 1.75em;
  padding: 0 0.58333em;
  right: -0.75em;
  top: -0.75em;
  z-index: 3;
`;

const Money = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1em;
  font-weight: 500;
  color: ${({ theme }) => theme.checkout.sideColors.text};
  white-space: nowrap;
`;

const Name = styled(Column)`
  justify-content: center;
  padding-left: 1em;
  & > span:first-child {
    font-weight: 500;
    color: ${({ theme }) => theme.checkout.sideColors.text};
  }
  & > span:last-child {
    font-size: 0.85714em;
    color: ${({ theme }) => theme.checkout.sideColors.smallText};
  }
`;

const ShowMoreButton = styled.button`
  background: red;
  position: absolute;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  height: 3em;
  width: 300%;
  left: -100%;
  @media (min-width: 1000px) {
    display: none;
  }
`;

export default {
  Products,
  Quantity,
  Row,
  Column,
  ImageWrapper,
  Money,
  Name,
  ShowMoreButton,
};
