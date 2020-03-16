import styled from "styled-components";
import { footerTitles, textCenter, textStart } from "../../styles/reusable";
const Footer = styled.footer`
  color: ${({ theme }) => theme.colors.gamma};
  padding: 35px 25px;
  @media (min-width: 481px) {
    padding: 50px 50px;
  }
  @media (min-width: 768px) {
    padding: 100px 50px;
  }
`;
const About = styled.div`
  p {
    line-height: 1.29;
  }
  h5 {
    ${footerTitles}
    @media (max-width: 767px) {
      margin: 0 0 6px;
    }
  }
`;

const Grid = styled.div`
  margin: 0;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Bottom = styled.div`
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;
const SocialIcons = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.secondary};
  ${textStart};
  svg {
    display: inline-block;
    margin: 0 8px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  @media (min-width: 768px) {
    ${textCenter};
  }
`;
const Copyright = styled.div`
  margin-top: 25px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gamma};
  a {
    color: ${({ theme }) => theme.colors.gamma};
  }
  ${textStart};
  @media (min-width: 768px) {
    ${textCenter};
  }
`;
const PaymentIcons = styled.ul`
  margin: 20px 0 0;
  padding: 0;
  ${textStart};
  @media (min-width: 768px) {
    ${textCenter};
  }
  li {
    font-size: 22px;
    display: inline-block;
    list-style: outside none none;
    margin: 5px 10px 0 0;
  }
`;
const Column = styled.div`
  max-width: none;
  padding: 0;
  margin-bottom: 22px;
  width: 100%;
  @media screen and (min-width: 768px) {
    ${({ width }) => (width ? `width:${width}` : "")};
    max-width: 25%;
    padding: ${({ padding }) => padding || "0 15px"};
  }
`;
export default {
  Footer,
  Grid,
  Bottom,
  SocialIcons,
  Copyright,
  PaymentIcons,
  Column,
  About
};
