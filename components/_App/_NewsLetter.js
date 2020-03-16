import styled from "styled-components";
import { footerTitles, textCenter } from "../../styles/reusable";
const Wrapper = styled.div`
  div {
    height: 46px;
    display: flex;
  }
  p {
    ${footerTitles}
    @media (max-width: 767px) {
      margin: 0 0 6px;
    }
  }
`;
const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  height: 100%;
  width: 0;
  flex-grow: 1;
  padding: 8px 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;
const Button = styled.button`
  height: 100%;
  width: 44px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-left: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  ${textCenter};
  &::after {
    height: 0;
    width: 0;
    content: "⟶";
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 15%;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    &::after {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export default { Wrapper, Input, Button };
