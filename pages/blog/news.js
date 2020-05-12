import Blog from "../../components/Blog/Blog";
import useGetComments from "../../utils/useGetComments";
const News = () => {
  const [comments] = useGetComments();
  return <Blog comments={comments} />;
};

export default News;
