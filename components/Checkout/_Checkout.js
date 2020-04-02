import styled from "styled-components";
import { title } from "../../styles/reusable";

const Wrapper = styled.div`
  line-height: 1.3em;
  color: ${({ theme }) => theme.checkout.colors.text};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column-reverse;
  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;
export default {
  Wrapper
};
