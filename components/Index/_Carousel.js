import styled from "styled-components";
import { inlineFlexCenter, HeroTextBlock, Hero } from "../../styles/reusable";
const Wrapper = styled(Hero)`
  cursor: grab;
  svg {
    width: 31px;
  }
`;

const CallToAction = styled.div`
  width: 100%;
  padding-top: 16px;
  ${inlineFlexCenter}
  flex-direction:column;
  @media (min-width: 481px) {
    flex-direction: row;
  }
  div {
    ${inlineFlexCenter}
    flex-wrap: wrap;
  }
  span {
    cursor: pointer;
    letter-spacing: 2px;
  }
  svg {
    font-size: 32px;
    margin: 8px;
  }
  button {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.button};
    padding: 12px 24px;
    margin: 0px 8px 0px 8px;
    @media (max-width: 479px) {
      width: 100%;
      margin: 0;
    }
  }
`;

export default { Wrapper, HeroTextBlock, CallToAction };
