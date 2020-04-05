import styled from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.div`
  line-height: 1.3em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  color: ${({ theme }) => theme.checkout.colors.text};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 40em;
  padding: 0 1em;
  flex-direction: column-reverse;
  @media (min-width: 1000px) {
    flex-direction: row;
    padding: 0 5%;
    max-width: 103em;
  }
`;

const Side = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 1000px) {
    width: 42%;
    padding-top: 4em;
    padding-left: 4%;
  }
  position: relative;
  & :after {
    content: "";
    display: block;
    width: 300%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.checkout.sideColors.background};
    z-index: -1;
    box-shadow: 0 -1px 0 ${({ theme }) =>
        theme.checkout.sideColors.backgroundBorder} inset;
    left: -100%;
    @media (min-width: 1000px) {
      left: 0;
      box-shadow: 1px 0 0
        ${({ theme }) => theme.checkout.sideColors.backgroundBorder} inset;
    }
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 1000px) {
    width: 58%;
    padding-top: 4em;
    padding-right: 6%;
  }
`;

const Footer = styled.footer`
  font-size: 0.85714em;
  color: ${({ theme }) => theme.checkout.colors.smallText};
  line-height: 1.5em;
  padding: 1em 0;
  border-top: 1px solid ${({ theme }) => theme.checkout.colors.gamma};
`;
export default {
  Wrapper,
  Side,
  Main,
  Footer
};
