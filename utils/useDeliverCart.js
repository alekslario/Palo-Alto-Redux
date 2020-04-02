import { useStore } from "./contextStore";
import { useFetchEntries } from "./useFetchEntries";

const useDeliverCart = () => {
  const [store, dispatch] = useStore();
  const [products, loading, timeStamp] = useFetchEntries({
    "sys.id[in]": Object.values(store.cart)
      .map(ele => ele.contentId)
      .join(),
    content_type: "paloAltoProduct",
    order: "sys.createdAt",
    dependency: [store.cart]
  });
  return [
    products.map(({ sys, fields: { name, styles } }, index) => {
      const {
        sys: { id },
        fields: {
          style,
          price,
          reducedPrice,
          reducedPriceExpiration,
          inStock,
          images
        }
      } = styles.find(style => store.cart[style.sys.id]);
      const url = images[0].fields.file.url;

      return {
        contentId: sys.id,
        productId: id,
        name,
        style,
        price:
          new Date(reducedPriceExpiration).getTime() > Date.now()
            ? reducedPrice
            : price,
        quantity: store.cart[id].quantity,
        image: url
      };
    })
  ];
};

export default useDeliverCart;
