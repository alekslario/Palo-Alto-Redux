import Blog from "../../../../components/Blog/Blog";
import getInitialPosts from "../../../../utils/getInitialPosts";
const NewArrivals = ({ comments }) => (
  <Blog filter="new arrivals" comments={comments} />
);

NewArrivals.getInitialProps = getInitialPosts({ tag: "new arrivals" });

export default NewArrivals;
