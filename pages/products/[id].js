import { useRouter } from "next/router";
import ProductSummary from "../../components/Product/ProductSummary/ProductSummary";
const ProductOverview = () => {
  const {
    query: { id }
  } = useRouter();

  return <ProductSummary id={id} />;
};
export default ProductOverview;
