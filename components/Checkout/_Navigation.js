import styled from "styled-components";
import { Row, Column, flexCenter } from "../../styles/reusable";

const Navigation = styled(Column)`
  margin-top: 1em;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5em;
  flex-direction: column-reverse;
  @media (min-width: 750px) {
    padding-bottom: 4em;
    flex-direction: row;
    margin-top: 1.5em;
  }
`;
const ButtonBack = styled.button`
  ${flexCenter}
  color: ${({ theme }) => theme.checkout.colors.attention};
  padding-top: 1.5em;
  svg {
    fill: ${({ theme }) => theme.checkout.colors.attention};
    transform: scale(-1, 1);
    display: block;
    margin: 0 auto;
  }
  @media (min-width: 750px) {
    margin-right: 1em;
    padding-top:0;
  }
  &:hover {
    opacity: 1;
    fill: ${({ theme }) => theme.checkout.colors.delta};
    color: ${({ theme }) => theme.checkout.colors.delta};
  }
`;
const ButtonForth = styled.button`
  background-color: ${({ theme }) => theme.checkout.colors.attention};
  background-clip: border-box;
  border: 1px transparent solid;
  border-radius: 5px;
  color: ${({ theme }) => theme.checkout.colors.background};
  font-weight: 500;
  padding: 1.7em 1.7em;
  text-align: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.checkout.colors.delta};
  }
  width: 100%;
  @media (min-width: 750px) {
    width: initial;
    padding: 1.4em 1.7em;
  }
`;
export default {
  Row,
  Column,
  Navigation,
  ButtonBack,
  ButtonForth
};
