import styled from "styled-components";
import { HeroTextBlock, Hero } from "../../styles/reusable";

const Text = styled(HeroTextBlock)`
  padding: 50px 50px 0;
  h1 {
    margin: 0 0 20px;
  }
`;

const Wrapper = styled(Hero)`
  height: 650px;
`;

export default { Wrapper, Text };
