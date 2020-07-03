import React, { useEffect, useRef, useState, useMemo } from "react";
import { useStore } from "../../utils/contextStore";
import $ from "./_SideMenuCart";
import useDeliverCart from "../../utils/useDeliverCart";
import Link from "next/link";
import CrossIcon from "../Icons/Cross";
import formatMoney from "../../utils/formatMoney";
import Image from "../_App/Image";
import SubmitButton from "../_App/SubmitButton";
import calculateCartTotal from "../../utils/calculateCartTotal";
import { useRouter } from "next/router";

const SideMenuCart = () => {
  const [store, dispatch] = useStore();
  const sideMenuCart = useRef(null);
  const [products, loading] = useDeliverCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !store.cartOpen) return;
    const handler = (e) => {
      const target = e.target;
      if (
        ((target.getBoundingClientRect().left <
          sideMenuCart.current.getBoundingClientRect().left &&
          target.getBoundingClientRect().left !==
            target.getBoundingClientRect().right) ||
          target.classList.contains("CLOSE_CART_SIDEBAR")) &&
        !target.classList.contains("OPEN_CART_SIDEBAR")
      ) {
        dispatch({ type: "CLOSE_CART" });
      }
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

  const { cartTotal } = useMemo(() => calculateCartTotal(products, 0), [
    products,
  ]);
  console.log("loading cart", loading);
  return (
    <>
      <$.SideMenuCart ref={sideMenuCart}>
        <$.Header
          css={`
            justify-content: space-between;
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
          <$.IconButton size={"19"} className="CLOSE_CART_SIDEBAR">
            <CrossIcon />
          </$.IconButton>
        </$.Header>
        <hr
          css={`
            height: 2px;
            width: 100%;
            border: none;
            background-color: ${({ theme }) => theme.colors.beta};
            margin: 0;
            min-height: 2px;
          `}
        />
        <div
          css={`
            padding-bottom: 25px;
          `}
        ></div>
        {products.length === 0 && <p>Your cart is currently empty.</p>}
        <$.Column>
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
                      img {
                        pointer-events: none;
                      }
                    `}
                    className="CLOSE_CART_SIDEBAR"
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
                        className="CLOSE_CART_SIDEBAR"
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
        </$.Column>
        <$.Column>
          <$.Row
            css={`
              justify-content: space-between;
            `}
          >
            <$.SubTitle>Subtotal</$.SubTitle>
            <$.SubTitle>{cartTotal}</$.SubTitle>
          </$.Row>
          <small>Shipping & taxes calculated at checkout</small>
          <SubmitButton
            loading={loading}
            disabled={products.length === 0}
            onClick={() => router.push("/checkout")}
            css={`
              width: 100%;
              margin-top: 20px;
            `}
          >
            CHECK OUT →
          </SubmitButton>
        </$.Column>
      </$.SideMenuCart>
    </>
  );
};

export default SideMenuCart;
