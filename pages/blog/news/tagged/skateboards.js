import Blog from "../../../../components/Blog/Blog";
import getInitialPosts from "../../../../utils/getInitialPosts";
const Skateboards = ({ comments }) => (
  <Blog filter="skateboards" comments={comments} />
);

Skateboards.getInitialProps = getInitialPosts({ tag: "skateboards" });

export default Skateboards;
