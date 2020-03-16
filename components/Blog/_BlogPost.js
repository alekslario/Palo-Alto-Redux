import styled, { css } from "styled-components";
import {
  textCenter,
  PageContent,
  textStart,
  H2,
  PageWrapper
} from "../../styles/reusable";

const BlogBlock = styled(PageContent)`
  img {
    width: 100%;
    margin: ${({ fullPost }) => (fullPost ? "50px 0" : "0 0 20px")};
  }
  p {
    margin: 15px 0;
  }
  small {
    font-size: 12px;
  }
`;
const Title = styled.h2`
  margin: 0 0 5px;
  ${H2};
  ${textCenter}
  line-height: 1.2;
  ${({ fullPost }) =>
    !fullPost &&
    css`
      ${textStart}
      font-size: 24px;
      @media (min-width: 992px) {
        font-size: 28px;
      }
    `};
`;
const SmallPrint = styled.div`
  color: #999;
  font-size: 12px;
  ${({ fullPost }) => (fullPost ? "text-align: center" : "")};
`;
const Text = styled.div`
  margin: 15px 0;
  color: ${({ theme }) => theme.colors.alpha};
  a {
    color: ${({ theme }) => theme.colors.alpha};
  }
`;
const Tags = styled.div`
  font-size: 12px;
  line-height: 2;
  margin-bottom: ${({ fullPost }) => (fullPost ? "25px" : "35px")};
  color: #999;
  a {
    color: #999;
  }
`;

const SocialIcons = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.secondary};
  ${textStart};

  a {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0 5px;
    &:first-child {
      margin-left: 0;
    }
  }
  svg {
    display: inline-block;
  }
`;

const PostFooter = styled.div`
  display: flex;
`;

const CommentPreview = styled.span`
  font-size: 14px;
  margin: 0 16px 35px 0;
`;

export default {
  PageWrapper,
  BlogBlock,
  Title,
  SmallPrint,
  Text,
  Tags,
  SocialIcons,
  PostFooter,
  CommentPreview
};
