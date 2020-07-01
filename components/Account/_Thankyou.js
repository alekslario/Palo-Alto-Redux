import styled, { css } from "styled-components";
import { Column, title, PageWrapper } from "../../styles/reusable";
const Title = styled.h1`
  ${title}
  margin-bottom:50px;
`;
export const Name = styled.span`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  &:hover ::after {
    white-space: normal;
    font-weight: normal;
    z-index: 11;
    content: attr(data-shipment);
    max-width: 300px;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 40%);
    background: #fdfdfd;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;
const Wrapper = styled(Column)`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;
export default {
  Wrapper,
  PageWrapper,
  Title,
  Name,
};
