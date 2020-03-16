import styled from "styled-components";
import { inlineFlexCenter, absoluteCenter } from "../../styles/reusable";

const BreadCrumbs = styled.div`
  color: ${({ theme }) => theme.colors.alpha};
  ${inlineFlexCenter}
  a {
    color: ${({ theme }) => theme.colors.alpha};
  }
  span,
  a {
    padding: 0 7px 0 0;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.beta};
  }
  margin: 20px 0;
  flex-wrap: wrap;
`;

export default {
  BreadCrumbs
};
