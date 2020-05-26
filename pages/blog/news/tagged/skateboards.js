import Blog from "../../../../components/Blog/Blog";
import { useGetComments } from "../../../../utils/useGetComments";
const Skateboards = () => {
  const [comments] = useGetComments({ tag: "skateboards" });
  return <Blog filter="skateboards" comments={comments} />;
};

export default Skateboards;
