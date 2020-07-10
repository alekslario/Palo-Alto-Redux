import styled, { css } from "styled-components";
import { Column, Row, centerImg } from "../../styles/reusable";
import { Name } from "./_Thankyou";
import { Wrapper as ModalWrapperDefault } from "./_PopUp";
import { ImageWrapper, Quantity } from "../Checkout/_Summary";
import { FieldName, Record, TableRow, TableColumn } from "../Checkout/_Table";
export const Wrapper = styled.div`
  margin: 15px 100px 15px 0;
  border-radius: 10px;
  width: calc(100% - 200px);
  min-width: min-content;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  background: #fdfdfd;
  padding: 15px 20px;
  @media (max-width: 767px) {
    width: 100%;
    margin: 25px 0;
    word-break: break-word;
  }
`;

const ModalWrapper = styled(ModalWrapperDefault)`
  z-index: 20;
  max-width: 400px;
`;

const ModalImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    ${centerImg}
  }
`;
export default {
  Column,
  Row,
  Wrapper,
  Name,
  ImageWrapper,
  Quantity,
  ModalWrapper,
  ModalImageWrapper,
  FieldName,
  Record,
  TableRow,
  TableColumn,
};
