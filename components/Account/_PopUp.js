import styled from "styled-components";
import { Row } from "../../styles/reusable";

const Wrapper = styled.div`
  position: absolute;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fdfdfd;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

export default {
  Row,
  Wrapper,
};
