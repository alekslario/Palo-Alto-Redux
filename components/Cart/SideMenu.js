import { useEffect, useRef, useState } from "react";
import { useStore } from "../../utils/contextStore";
import $ from "./_SideMenu";
import { useFetchEntries } from "../../utils/useFetchEntries";
import { useLazyLoading } from "../../utils/useLazyLoading";
import createContentfulSrc from "../../utils/createContentfulSrc";
const SideMenu = () => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);

  const [products, loading, timeStamp] = useFetchEntries({
    "sys.id[in]": Object.values(store.cart)
      .map(ele => ele.contentId)
      .join(),
    content_type: "paloAltoProduct",
    order: "sys.createdAt",
    dependency: [store.cart]
  });

  console.log("products", products);
  console.log("store.cart", store.cart);
  // useEffect(() => {
  //   if (typeof window === "undefined" || !store.menuOpen) return;
  //   const handler = e => {
  //     const target = e.target;
  //     if (target === document.querySelector("#cart")) {
  //       dispatch({ type: "OPEN_MENU" });
  //     } else if (target !== sideMenu.current) {
  //       dispatch({ type: "CLOSE_MENU" });
  //     }
  //   };
  //   window.addEventListener("click", handler);
  //   return () => window.removeEventListener("click", handler);
  // }, [store.menuOpen]);

  return (
    <>
      <$.SideMenu ref={sideMenu}>
        <h1>Shopping Cart</h1>
        <hr />
        <div></div>
        {products.map(({ fields: { name, styles } }, index) => {
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
          } = styles.find(({ sys }) => store.cart[sys.id]);
          const url = images[0].fields.file.url;
          return (
            <div key={index}>
              <div>{name}</div>
              <img
                src={url + "?w=180"}
                alt=""
                className="lazyload blur-up"
                data-sizes="auto"
                data-parent-fit="cover"
                data-srcset={createContentfulSrc(url)}
              />
              <div>{style}</div>
              <button
                onClick={() =>
                  dispatch({ type: "DECREMENT_CART", productId: id })
                }
              >
                -
              </button>
              <div>{store.cart[id].quantity}</div>
              <button
                onClick={() =>
                  dispatch({ type: "INCREMENT_CART", productId: id })
                }
              >
                +
              </button>
              <div>
                {new Date(reducedPriceExpiration).getTime() > Date.now()
                  ? reducedPrice
                  : price}
              </div>
            </div>
          );
        })}
      </$.SideMenu>
    </>
  );
};

export default SideMenu;
