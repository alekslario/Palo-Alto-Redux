import styled, { css } from "styled-components";
import { Column, Row, centerImg } from "../../styles/reusable";
import { Name } from "./_Thankyou";
import { Wrapper as ModalWrapperDefault } from "./_PopUp";
import { ImageWrapper, Quantity } from "../Checkout/_Summary";

const Wrapper = styled.div`
  padding: 25px 25px 25px 0;
  & > div > span {
    min-width: 25%;
    display: inline-block;
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
};
