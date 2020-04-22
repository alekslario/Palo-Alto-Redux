import styled, { css } from "styled-components";

const textCenter = css`
  text-align: center;
`;

const textStart = css`
  text-align: start;
`;
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const inlineFlexCenter = css`
  ${flexCenter}
  display: inline-flex;
`;

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;
const hidden = css`
  border: 0;
  clip: rect(0, 0, 0, 0);
  width: 2px;
  height: 2px;
  margin: -2px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

const backgroundCover = css`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const absoluteCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`;

const footerTitles = css`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  font-size: 16px;
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.font_family.secondary};
`;

const title = css`
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-weight: 700;
  font-style: normal;
`;
const H1 = css`
  ${title}
  font-size: 29px;
  display: block;
  margin: 0 0 10px;
  line-height: 1.08;
  @media (min-width: 480px) {
    font-size: 38px;
  }
  @media (min-width: 992px) {
    font-size: 48px;
  }
`;

const H2 = css`
  a {
    color: ${({ theme }) => theme.colors.beta};
  }
  color: ${({ theme }) => theme.colors.beta};
  ${title}
  font-size: 28px;
  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;

const overlay = css`
  content: "";
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const HeroTextBlock = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  ${absoluteCenter};
  ${textCenter};
  user-select: none;
  padding: 0 20px;
  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
  h1 {
    ${H1}
  }
  h2 {
    font-size: 18px;
    margin: -10px 0 10px;
    font-weight: 400;
    font-style: normal;
  }
  @media (min-width: 480px) {
    padding: 0 50px;
    h2 {
      font-size: 20px;
    }
  }
`;

const centerImg = css`
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;
  top: -9999px;
  bottom: -9999px;
`;
const Hero = styled.div`
  overflow: hidden;
  height: 100vh;
  object-fit: cover;
  position: relative;
  img {
    min-width: 100%;
    min-height: 100%;
    ${centerImg}
  }
  &::after {
    ${overlay}
  }
`;

const PageWrapper = styled.div`
  padding: calc(25px + 64px) 25px;
  @media (min-width: 481px) {
    padding: calc(25px + 64px) 50px;
  }
  @media (min-width: 768px) {
    padding: calc(50px + 64px) 50px;
  }
  @media (min-width: 1024px) {
    padding: calc(50px + 61px) 50px 100px;
  }
`;

const HiddenLabel = styled.label`
  position: absolute;
  height: 0;
  width: 0;
  margin-bottom: 0;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

const PageContent = styled.div`
  max-width: 840px;
  margin: 0 auto 10px;
`;

const Error = styled.p`
  color: #b90c0c;
  padding: 5px;
  background-color: #ffdcdc;
  border: 1px solid #b90c0c;
  ${textCenter};
`;

const input = css`
  display: block;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.delta};
  padding: 12px 14px;
  width: 100%;
  min-height: 1px;
`;

const Input = styled.input`
  ${input}
`;

const SubmitButton = styled.button`
  display: block;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  ${textCenter};
  font-size: 14px;
  padding: 12px 24px;
  letter-spacing: 1px;
  border: 2px solid transparent;
`;

const IconButton = styled.button`
  ${({ size }) =>
    size ? `height: ${size}px;width: ${size}px;` : "height: 22px;width: 22px;"};
`;

const Row = styled.div`
  ${flexRow}
`;

const Column = styled.div`
  ${flexColumn}
`;

const mobileOrDesktop = css`
  ${({ mobile }) =>
    mobile
      ? css`
          display: block;
          @media (min-width: 1000px) {
            display: none;
          }
        `
      : ""};
  ${({ desktop }) =>
    desktop
      ? css`
          display: none;
          @media (min-width: 1000px) {
            display: block;
          }
        `
      : ""};
`;

const CheckoutClickMe = css`
  color: ${({ theme }) => theme.checkout.colors.attention};
  cursor: pointer;
  fill: currentColor;
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.checkout.colors.attentionSecondary};
  }
`;
export {
  flexCenter,
  absoluteCenter,
  backgroundCover,
  inlineFlexCenter,
  footerTitles,
  HeroTextBlock,
  Hero,
  H1,
  overlay,
  title,
  input,
  PageWrapper,
  HiddenLabel,
  textCenter,
  textStart,
  PageContent,
  Error,
  SubmitButton,
  H2,
  Input,
  IconButton,
  flexColumn,
  flexRow,
  Row,
  Column,
  centerImg,
  mobileOrDesktop,
  CheckoutClickMe,
  hidden,
};
