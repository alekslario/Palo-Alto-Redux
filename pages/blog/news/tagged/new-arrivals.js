import Blog from "../../../../components/Blog/Blog";
import useGetComments from "../../../../utils/useGetComments";
const NewArrivals = () => {
  const [comments] = useGetComments({ tag: "new arrivals" });
  return <Blog filter="new arrivals" comments={comments} />;
};

export default NewArrivals;
