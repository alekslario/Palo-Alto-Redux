import { useGetComments } from "../../../utils/useGetComments";
import BlogPost from "../../../components/Blog/BlogPost";
import { useRouter } from "next/router";
const Post = () => {
  const router = useRouter();
  const [comments] = useGetComments({ id: router.query.id });
  return <BlogPost blogId={router.query.id} comments={comments} />;
};
export default Post;
