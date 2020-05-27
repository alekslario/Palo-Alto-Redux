import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../utils/contextStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "./_SideMenu";
import useDeliverCart from "../../utils/useDeliverCart";
import Link from "next/link";
import CrossIcon from "../Icons/Cross";
import formatMoney from "../../utils/formatMoney";
import Image from "../_App/Image";

const SideMenu = () => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);
  const [products] = useDeliverCart();

  useEffect(() => {
    if (typeof window === "undefined" || !store.menuOpen) return;
    const handler = (e) => {
      const target = e.target;
      if (
        (target.getBoundingClientRect().left <
          sideMenu.current.getBoundingClientRect().left ||
          target.classList.contains("CLOSE_SIDEBAR")) &&
        !target.classList.contains("OPEN_SIDEBAR")
      )
        dispatch({ type: "CLOSE_MENU" });
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const handlePlusMinus = (productId, contentId, modifier) => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      contentId,
      modifier,
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
          <$.IconButton size={"19"} className="CLOSE_SIDEBAR">
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
          {products.map(
            (
              { contentId, productId, name, style, price, quantity, image },
              index
            ) => (
              <$.ProductWrapper key={index}>
                <Link href={"/products/[id]"} as={`/products/${contentId}`}>
                  <a
                    css={`
                      width: 33.333%;
                      cursor: pointer;
                    `}
                    className="CLOSE_SIDEBAR"
                  >
                    <Image url={image} />
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
                    <Link href={"/products/[id]"} as={`/products/${contentId}`}>
                      <a
                        css={`
                          font-size: 16px;
                          cursor: pointer;
                        `}
                        className="CLOSE_SIDEBAR"
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
                      {formatMoney(price)}
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
                    <button
                      onClick={() => handlePlusMinus(productId, contentId, -1)}
                    >
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
                        {quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlusMinus(productId, contentId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </$.ProductWrapper>
            )
          )}
        </$.Grid>
      </$.SideMenu>
    </>
  );
};

export default SideMenu;
