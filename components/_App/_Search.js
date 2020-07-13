import styled, { keyframes } from "styled-components";
import {
  inlineFlexCenter,
  textCenter,
  title,
  flexCenter,
  IconButton,
  Row,
} from "../../styles/reusable";

const fadeIn = keyframes`
 0% {
    opacity:0;
  }

  100% {
    opacity:1;
  }
`;

const Nav = styled.div`
  ${inlineFlexCenter}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  padding: 28px 67px 0 0;
  z-index: 2;
  justify-content: flex-end;
  background-color: white;
`;
const SearchInput = styled.input`
  line-height: normal;
  padding-right: 30px;
  width: 100%;
  height: 100%;
  font-size: 24px;
  font-weight: 300;
  border: none;
`;

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  ${inlineFlexCenter}
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-bottom:35px;
`;
const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  overflow-y: auto;
  z-index: 999999999;
  top: 0;
  padding: 72px 50px 50px 50px;
  ${flexCenter}
  justify-content:flex-start;
  flex-direction: column;
  overflow-y: scroll;
  animation: ${fadeIn} 0.3s forwards;
`;

const Links = styled(Row)`
  flex-wrap: wrap;
  & a,
  span {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 33px;
    ${title}
  }
  & span {
    margin: 0 6px 0 6px;
  }
`;

export default { IconButton, Wrapper, SearchInput, Nav, InputWrapper, Links };
