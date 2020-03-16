import Blog from "../../../../components/Blog/Blog";
import getInitialPosts from "../../../../utils/getInitialPosts";
const LongBoards = ({ comments }) => (
  <Blog filter="longboards" comments={comments} />
);

LongBoards.getInitialProps = getInitialPosts({ tag: "longboards" });

export default LongBoards;
