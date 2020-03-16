import Blog from "../../components/Blog/Blog";
import getInitialPosts from "../../utils/getInitialPosts";
const News = ({ comments }) => <Blog comments={comments} />;

News.getInitialProps = getInitialPosts();
export default News;
