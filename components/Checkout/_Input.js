import styled from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.div`
  width: ${({ width }) => width};
  padding: 0.42857em;
  div {
    position: relative;
  }
`;
const Label = styled.label`
  color: ${({ theme }) => theme.checkout.colors.smallText};
  transition: all 0.2s ease-out;
  font-weight: normal;
  position: absolute;
  width: 100%;
  margin-top: 0.42857em;
  margin-left: 1px;
  padding: 0 0.91667em;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  margin: 0.5em 0;
  top: ${({ value }) => (value ? "0" : "0.5em")};
  font-size: ${({ value }) => (value ? "0.85714em" : "inherit")};
`;
const Input = styled.input`
  transition: all 0.2s ease-out;
  background-color: white;
  color: #333333;
  border: 1px #d9d9d9 solid;
  border-radius: 5px;
  background-clip: padding-box;
  width: 100%;
  padding: ${({ value }) =>
    value ? "1.5em 0.78571em 0.35714em;" : "0.92857em 0.78571em;"};
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.checkout.colors.attention};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.checkout.colors.attention};
  }
`;
export default {
  Wrapper,
  Input,
  Label
};
