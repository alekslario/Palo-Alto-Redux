import React from "react";
import Link from "next/link";
import createContentfulSrc from "../../utils/createContentfulSrc";
import { useStore } from "../../utils/contextStore";
import $ from "./_Product";
const Product = React.forwardRef(({ product }, ref) => {
  // styles[0].fields.reducedPrice
  // styles[0].fields.reducedPriceExpiration
  const [store, dispatch] = useStore();

  const {
    sys: { id },
    fields: { name, styles }
  } = product;
  const src = [
    styles[0].fields.images[0].fields.file.url,
    styles.length > 1
      ? styles[1].fields.images[0].fields.file.url
      : styles[0].fields.images[1].fields.file.url
  ];

  const saveProduct = () => dispatch({ type: "ADD_PRODUCT", product });

  return (
    <Link href={"/products/[id]"} as={`/products/${id}`}>
      <a onClick={saveProduct} ref={ref}>
        <$.Wrapper>
          <div
            className="lazyload blur-up"
            data-bgset={createContentfulSrc(src[1])}
            data-sizes="auto"
            data-parent-fit="cover"
            data-aspectratio="1.0"
            style={{
              backgroundImage: `${src[0] + "?w=180"}`
            }}
          >
            <img
              src={src[0] + "?w=180"}
              alt=""
              className="lazyload blur-up"
              data-sizes="auto"
              data-parent-fit="cover"
              data-srcset={createContentfulSrc(src[0])}
            />
            <button>ADD TO CART</button>
          </div>
          <$.Link href="#" size="16.8px">
            {name}
          </$.Link>
          <$.Link toppadding="0" href="#">
            {"$" + styles[0].fields.price / 100}
          </$.Link>
        </$.Wrapper>
      </a>
    </Link>
  );
});

export default Product;
