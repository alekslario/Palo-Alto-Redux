import Blog from "../../../../components/Blog/Blog";
import { useGetComments } from "../../../../utils/useGetComments";
const LongBoards = () => {
  const [comments] = useGetComments({ tag: "longboards" });
  return <Blog filter="longboards" comments={comments} />;
};

export default LongBoards;
