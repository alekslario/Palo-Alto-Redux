import $ from "./_Order";
import { css } from "styled-components";
import Image from "../_App/Image";
import { useStore } from "../../utils/contextStore";
import formatMoney from "../../utils/formatMoney";
import { PortalWithState } from "react-portal";
import { useCloseModals } from "../../utils/useCloseModals";
import Link from "next/link";
import CrossIcon from "../Icons/Cross";
const ProductModal = ({
  closePortal,
  addToCart,
  fields: { style, description, contentId, productId, name, url, price },
}) => {
  useCloseModals(closePortal);
  return (
    <>
      <$.ModalWrapper>
        <$.Row
          css={`
            justify-content: flex-end;
          `}
        >
          <span
            onClick={closePortal}
            css={`
              width: 22px;
              cursor: pointer;
              svg {
                pointer-events: none;
              }
            `}
          >
            <CrossIcon />
          </span>
        </$.Row>
        <$.Row>
          <Link href={"/products/[id]"} as={`/products/${contentId}`}>
            <a>
              <$.ModalImageWrapper>
                <Image url={url} />
              </$.ModalImageWrapper>
            </a>
          </Link>
          <$.Column
            css={`
              justify-content: center;
            `}
          >
            <Link href={"/products/[id]"} as={`/products/${contentId}`}>
              <a>
                <h3
                  css={`
                    margin: 0;
                    color: #333;
                    font-family: ${({ theme }) => theme.font_family.secondary};
                  `}
                >
                  {name}
                </h3>
              </a>
            </Link>
            {style !== "Default" && <small>{style}</small>}
            <div
              css={`
                margin-bottom: 5px;
              `}
            >
              {formatMoney(price)}
            </div>
          </$.Column>
        </$.Row>

        <div>
          {description.content
            .map(({ content }) => content.map(({ value }) => value))
            .join("")
            .slice(0, 80) + "..."}
        </div>
      </$.ModalWrapper>
    </>
  );
};
{
  /* <SubmitButton onClick={addToCart}>ADD TO CART</SubmitButton> */
}
const OrderProduct = ({ contentId, productId, quantity, price }) => {
  const [store, dispatch] = useStore();
  const { fields: { name, description, styles = [] } = {} } =
    store.cache[contentId] || {};
  const { fields: { images = [], style } = {} } =
    styles.find((style) => style.sys.id === productId) || {};

  const url = images[0]?.fields.file.url;

  const handleAddToCart = () => {
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      productId,
      contentId,
      modifier: 1,
    });
  };

  return (
    <>
      {url && (
        <PortalWithState closeOnEsc closeOnOutsideClick>
          {({ openPortal, closePortal, isOpen, portal }) => {
            return (
              <React.Fragment>
                <div
                  onClick={openPortal}
                  css={`
                    position: relative;
                    display: inline-block;
                    margin: 10px 10px 0 0;
                    cursor: pointer;
                  `}
                >
                  <$.Quantity>{quantity}</$.Quantity>
                  <$.ImageWrapper
                    tabIndex="0"
                    css={`
                      outline: none;
                      ${isOpen
                        ? css`
                            box-shadow: 0 0 0 2px #1579a6;
                          `
                        : ""}

                      &:hover {
                        box-shadow: 0 0 0 2px
                          ${({ theme }) =>
                            theme.checkout.colors.attentionSecondary};
                      }
                    `}
                  >
                    <Image url={url} thumb={true} />
                  </$.ImageWrapper>
                  <div
                    css={`
                      text-align: center;
                    `}
                  >
                    {formatMoney(price)}
                  </div>
                </div>
                {portal(
                  <ProductModal
                    closePortal={closePortal}
                    addToCart={handleAddToCart}
                    fields={{
                      style,
                      description,
                      contentId,
                      productId,
                      name,
                      url,
                      price,
                    }}
                  />
                )}
              </React.Fragment>
            );
          }}
        </PortalWithState>
      )}
    </>
  );
};

const Order = ({
  order: {
    _id,
    email,
    shippingCost,
    total,
    createdAt,
    products,
    status,
    shipping: { name, ...rest } = {},
  },
}) => {
  return (
    <$.Wrapper>
      <div>
        <span>ORDER </span># {_id}
      </div>
      <div>
        <span>ORDER PLACED </span>

        {new Date(createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div>
        <span>TOTAL </span>
        {formatMoney(total)}
      </div>
      <div
        css={`
          text-transform: uppercase;
        `}
      >
        <span>STATUS </span>
        {status}
      </div>
      <div>
        <span>DELIVER TO </span>
        <$.Name
          data-shipment={Object.values(rest)
            .filter((x) => x)
            .join(", ")}
        >
          {name}
        </$.Name>
      </div>
      <div
        css={`
          margin-top: 15px;
        `}
      >
        {products.map((product, index) => (
          <OrderProduct key={index} {...product} />
        ))}
      </div>
    </$.Wrapper>
  );
};

export default Order;
