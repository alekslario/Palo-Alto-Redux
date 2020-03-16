import styled from "styled-components";
import {
  inlineFlexCenter,
  PageWrapper,
  H1,
  textCenter
} from "../../styles/reusable";
import styledPost from "./_BlogPost";
const {
  BlogBlock,
  Title,
  SmallPrint,
  Text,
  PostFooter,
  CommentPreview
} = styledPost;

const BlogTitle = styled.div`
  ${H1}
  a {
    color: ${({ theme }) => theme.colors.beta};
  }
  color: ${({ theme }) => theme.colors.beta};
  ${textCenter};
  padding-bottom: 14px;
  font-size: 28px;
  @media (max-width: 991px) {
    font-size: 28px;
  }
  @media (min-width: 992px) {
    padding-bottom: 18px;
    font-size: 36px;
  }
`;

const Links = styled.div`
  width: 100%;
  a {
    color: ${({ theme }) => theme.colors.alpha};
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.colors.delta};
  }
  span {
    color: ${({ theme }) => theme.colors.delta};
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
  ${inlineFlexCenter}
  margin-bottom:50px;
  flex-wrap: wrap;
`;

export default {
  PageWrapper,
  BlogTitle,
  Links,
  BlogBlock,
  Title,
  SmallPrint,
  Text,
  PostFooter,
  CommentPreview
};
