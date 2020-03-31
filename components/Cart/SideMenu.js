import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../utils/contextStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "./_SideMenu";
import { useFetchEntries } from "../../utils/useFetchEntries";
import { useLazyLoading } from "../../utils/useLazyLoading";
import Link from "next/link";
import CrossIcon from "../Icons/Cross";
import formatMoney from "../../utils/formatMoney";
import Image from "../_App/Image";

const SideMenu = () => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);
  console.log(store.cart);
  const [products, loading, timeStamp] = useFetchEntries({
    "sys.id[in]": Object.values(store.cart)
      .map(ele => ele.contentId)
      .join(),
    content_type: "paloAltoProduct",
    order: "sys.createdAt",
    dependency: [store.cart]
  });
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

  const handlePlusMinus = (productId, contentId, modifier) => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      contentId,
      modifier
    });
  };
  return (
    <>
      <$.SideMenu ref={sideMenu}>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
          `}
        >
          <div
            css={`
              font-size: 22px;

              color: ${({ theme }) => theme.colors.beta};
            `}
          >
            Shopping Cart
          </div>
          <$.IconButton size={"19"}>
            <CrossIcon />
          </$.IconButton>
        </div>
        <hr
          css={`
            height: 2px;
            border: none;
            background-color: ${({ theme }) => theme.colors.beta};
            margin-bottom: 25px;
          `}
        />

        {products.length === 0 && <p>Your cart is currently empty.</p>}
        <$.Grid>
          {products.map(({ sys, fields: { name, styles } }, index) => {
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
            return (
              <$.ProductWrapper key={index}>
                <Link href={`/products/${sys.id}`}>
                  <a
                    css={`
                      width: 33.333%;
                    `}
                  >
                    <Image url={url} />
                  </a>
                </Link>
                <div
                  css={`
                    padding-left: 25px;
                    width: 66.666%;
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Link
                      href={`/products/${sys.id}`}
                      as={`/products/${sys.id}`}
                    >
                      <a
                        css={`
                          font-size: 16px;
                        `}
                      >
                        {name}
                      </a>
                    </Link>
                    {style !== "Default" && (
                      <div
                        css={`
                          font-size: 14px;
                          color: ${({ theme }) => theme.colors.alpha};
                        `}
                      >
                        {style}
                      </div>
                    )}
                    <div
                      iv
                      css={`
                        font-size: 15px;
                      `}
                    >
                      {formatMoney(
                        new Date(reducedPriceExpiration).getTime() > Date.now()
                          ? reducedPrice
                          : price
                      )}
                    </div>
                  </div>

                  <div
                    css={`
                      display: flex;
                      flex-direction: row;
                      align-self: bottom;
                      font-size: 18px;
                      button {
                        font-size: 25px;
                      }
                    `}
                  >
                    <button onClick={() => handlePlusMinus(id, sys.id, -1)}>
                      &#8722;
                    </button>
                    <div
                      css={`
                      display: flex;
                      align-items: center;
                      }
                    `}
                    >
                      <span
                        css={`
                          padding: 0 3px;
                        `}
                      >
                        {store.cart[id].quantity}
                      </span>
                    </div>
                    <button onClick={() => handlePlusMinus(id, sys.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </$.ProductWrapper>
            );
          })}
        </$.Grid>
      </$.SideMenu>
    </>
  );
};

export default SideMenu;
