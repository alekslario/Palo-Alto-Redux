import useGetComments from "../../../utils/useGetComments";
import BlogPost from "../../../components/Blog/BlogPost";
const Post = () => {
  const [comments, id] = useGetComments({ id: true });
  return <BlogPost blogId={id} comments={comments} />;
};
export default Post;
