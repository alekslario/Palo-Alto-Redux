import $ from "../components/Account/_Thankyou";
import { useRouter } from "next/router";
import SubmitButton from "../components/_App/SubmitButton";
import Products from "../components/Product/Products";
const Thankyou = () => {
  const router = useRouter();
  const {
    name,
    email,
    orderId,
    shippingAddress,
    delivery_date,
    boughtItems,
  } = router.query;
  const badQuery = name && email && orderId && shippingAddress && delivery_date;
  return (
    <$.PageWrapper>
      {!badQuery && (
        <h1
          css={`
            text-align: center;
          `}
        >
          Nothing to see here. Move along.
        </h1>
      )}
      {badQuery && (
        <>
          <$.Wrapper
            css={`
              text-align: center;
            `}
          >
            <$.Title>Thank you, your order has been placed.</$.Title>
            <div>
              <span>Order Number: {orderId}.</span>&nbsp;
              <i>{boughtItems}</i> will be delivered to&nbsp;
              <$.Name data-shipment={shippingAddress}>{name}</$.Name>.&nbsp; The
              estimated date of delivery:{" "}
              {new Date(+delivery_date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
            <p>
              Please check your email for order confirmation and detailed
              delivery information.
            </p>
            <SubmitButton
              css={`
                margin: 50px auto;
              `}
              onClick={() => router.push("/")}
            >
              CONTINUE BROWSING
            </SubmitButton>
          </$.Wrapper>
          <h2
            css={`
              text-align: center;
              margin-top: 100px;
              font-family: ${({ theme }) => theme.font_family.secondary};
              font-weight: 700;
              font-style: normal;
            `}
          >
            You May Also Like
          </h2>
          <Products limitProducts={4} padding="0" />
        </>
      )}
    </$.PageWrapper>
  );
};

export default Thankyou;
