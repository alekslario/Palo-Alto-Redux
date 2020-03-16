import { useRouter } from "next/router";
import getInitialPosts from "../../../utils/getInitialPosts";
import BlogPost from "../../../components/Blog/BlogPost";
const Post = ({ comments }) => {
  const {
    query: { id }
  } = useRouter();
  return <BlogPost blogId={id} comments={comments} />;
};
Post.getInitialProps = getInitialPosts({ id: true });
export default Post;
