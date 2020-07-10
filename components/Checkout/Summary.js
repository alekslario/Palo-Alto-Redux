import formatMoney from "../../utils/formatMoney";
import $ from "./_Summary";
import Image from "../_App/Image";
import { useRouter } from "next/router";

const Summary = ({ shipping = 0, products, cartTotal }) => {
  const router = useRouter();
  return (
    <>
      {products.length === 0 && (
        <$.Column>
          <div
            css={`
              text-align: center;
              font-size: 28px;
              @media (max-width: 999px) {
                margin-top: 40px;
              }
            `}
          >
            Your cart is empty
          </div>
          <$.ButtonForth
            onClick={() => router.push("/")}
            css={`
              margin: 40px auto;
            `}
          >
            CONTINUE BROWSING
          </$.ButtonForth>
        </$.Column>
      )}
      {products.length > 0 && (
        <>
          <$.Products>
            {products.map(({ name, style, price, quantity, image }, index) => (
              <$.Row
                key={index}
                css={`
                  justify-content: space-between;
                `}
              >
                <$.Row>
                  <div
                    css={`
                      position: relative;
                    `}
                  >
                    <$.Quantity>{quantity}</$.Quantity>
                    <$.ImageWrapper>
                      <Image url={image} thumb={true} />
                    </$.ImageWrapper>
                  </div>
                  <$.Name>
                    <span>{name}</span>
                    {style !== "Default" ? <span>{style}</span> : <span />}
                  </$.Name>
                </$.Row>
                <$.Money>{formatMoney(price)}</$.Money>
              </$.Row>
            ))}
          </$.Products>
          <$.Column
            css={`
              border: 1px solid
                ${({ theme }) => theme.checkout.sideColors.gamma};
              border-left: none;
              border-right: none;
              padding: 1.5em 0;
            `}
          >
            <$.Row
              css={`
                justify-content: space-between;
              `}
            >
              <span
                css={`
                  color: ${({ theme }) => theme.checkout.sideColors.subText};
                `}
              >
                Subtotal
              </span>
              <span
                css={`
                  font-weight: 500;
                  color: ${({ theme }) => theme.checkout.sideColors.text};
                `}
              >
                {cartTotal}
              </span>
            </$.Row>
            <$.Row
              css={`
                justify-content: space-between;
                padding-top: 0.75em;
              `}
            >
              <span
                css={`
                  color: ${({ theme }) => theme.checkout.sideColors.subText};
                `}
              >
                Shipping
              </span>
              <span
                css={`
                  font-size: 0.85714em;
                  color: ${({ theme }) => theme.checkout.sideColors.smallText};
                `}
              >
                {shipping ? formatMoney(shipping) : "Calculated at next step"}
              </span>
            </$.Row>
          </$.Column>
          <$.Row
            css={`
              justify-content: space-between;
              padding: 1.5em 0;
              align-content: center;
            `}
          >
            <span
              css={`
                font-size: 1.14286em;
              `}
            >
              Total
            </span>
            <span
              css={`
                display: flex;
                align-content: center;
              `}
            >
              <span
                css={`
                  font-size: 0.85714em;
                  margin-right: 0.8em;
                  line-height: 2;
                  color: ${({ theme }) => theme.checkout.sideColors.smallText};
                `}
              >
                USD
              </span>
              <span
                css={`
                  font-size: 1.71429em;
                  font-weight: 500;
                  white-space: nowrap;
                `}
              >
                {cartTotal}
              </span>
            </span>
          </$.Row>
        </>
      )}
    </>
  );
};

export default Summary;
