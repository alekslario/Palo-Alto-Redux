import { useMemo, useEffect, useState } from "react";
import $ from "../components/Cart/_Cart";
import { useStore } from "../utils/contextStore";
import { useRouter } from "next/router";
import SubmitButton from "../components/_App/SubmitButton";
import formatMoney from "../utils/formatMoney";
import useDeliverCart from "../utils/useDeliverCart";
import Image from "../components/_App/Image";
import Link from "next/link";
import CrossIcon from "../components/Icons/Cross";
import LoaderIcon from "../components/Icons/Loader";
import calculateCartTotal from "../utils/calculateCartTotal";

const Cart = () => {
  const [store, dispatch] = useStore();
  const [products, loading, timestamp] = useDeliverCart();
  //since the page is not server rendered when need this trick
  //to prevent it showing EMPTY CART on first load while redux store is empty
  const [delayedLoader, showDelayedLoader] = useState(true);
  useEffect(() => {
    const loadingHandler = setTimeout(() => showDelayedLoader(false), 2000);
    return () => clearTimeout(loadingHandler);
  }, []);
  const router = useRouter();

  const handleDelete = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", productId });
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

  return (
    <$.PageWrapper>
      {((delayedLoader && Object.keys(store.cart).length === 0) || loading) && (
        <div
          css={`
            display: flex;
            justify-content: center;
            svg {
              height: 75px;
            }
          `}
        >
          <LoaderIcon fill="#000" />
        </div>
      )}
      {!delayedLoader && Object.keys(store.cart).length === 0 && (
        <$.Column
          css={`
            display: flex;
            justify-content: center;
            text-align: center;
          `}
        >
          <$.MainHeader
            css={`
              margin: 0;
              padding: 0;
              @media (min-width: 768px) {
                font-size: 28px;
                margin: 0;
                padding: 0;
              }
            `}
          >
            Shopping Cart
          </$.MainHeader>
          <p>Your cart is currently empty.</p>
          <SubmitButton
            css={`
              margin: 0 auto;
            `}
            onClick={() => router.push("/")}
          >
            CONTINUE BROWSING
          </SubmitButton>
        </$.Column>
      )}
      {products.length > 0 && (
        <>
          <$.MainHeader>Shopping Cart</$.MainHeader>
          <$.TableRow
            css={`
              border-bottom: 2px solid ${({ theme }) => theme.colors.delta};
              & > div:nth-child(2) {
                height: auto;
              }
              @media (max-width: 767px) {
                display: none;
              }
            `}
          >
            <div
              css={`
                padding: 40px 39px 40px 0;
              `}
            ></div>
            <div>Product</div>
            <div></div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </$.TableRow>
          {products.map(
            (
              { contentId, productId, name, style, price, quantity, image },
              index
            ) => (
              <$.TableRow key={index}>
                <div>
                  <$.IconButton
                    size={"15"}
                    onClick={() => handleDelete(productId)}
                  >
                    <CrossIcon />
                  </$.IconButton>
                </div>
                <div>
                  <Link href={"/products/[id]"} as={`/products/${contentId}`}>
                    <a>
                      <Image
                        url={image}
                        css={`
                          width: 100%;
                        `}
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href={"/products/[id]"} as={`/products/${contentId}`}>
                    <a>
                      {name} {style !== "Default" && <span>- {style}</span>}
                    </a>
                  </Link>
                </div>
                <div data-label="Price">
                  <span>{formatMoney(price)} USD</span>
                </div>
                <$.Row
                  data-label="Quantity"
                  css={`
                    button {
                      font-size: 25px;
                      color: ${({ theme }) => theme.colors.alpha};
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
                        margin: 0 20px;
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
                </$.Row>

                <div data-label="Total">
                  <span>
                    {formatMoney(price * store.cart[productId].quantity)} USD
                  </span>
                </div>
              </$.TableRow>
            )
          )}
          <$.Column
            css={`
              align-items: center;
            `}
          >
            <p
              css={`
                font-size: 24px;
                color: ${({ theme }) => theme.colors.beta};
                margin-top: 40px;
              `}
            >
              Subtotal {cartTotal} USD
            </p>
            <small>Shipping & taxes calculated at checkout</small>
            <SubmitButton
              onClick={() => router.push("/checkout")}
              css={`
                width: 100%;
                max-width: 300px;
                margin-top: 10px;
              `}
            >
              CHECK OUT
            </SubmitButton>
          </$.Column>
        </>
      )}
    </$.PageWrapper>
  );
};

export default Cart;
