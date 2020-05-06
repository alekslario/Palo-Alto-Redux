import RadioPick from "./Radio";
import ShippingAddress from "./ShippingAddress";
import $ from "./_BillingAddress";
const BillingAddress = ({
  switchAddress,
  billingAddress,
  handleBillingAddressChange,
}) => (
  <$.BillingAddress>
    <$.Information>
      <$.H2>Billing Address</$.H2>
      <p>Select the address that matches your card or payment method.</p>
    </$.Information>
    <$.Table>
      <label htmlFor={"sameAsShipping"}>
        <$.Row
          css={`
            padding: 1.14286em;
            cursor: pointer;
          `}
        >
          <RadioPick
            id={"sameAsShipping"}
            name="radio-shipping"
            checked={billingAddress.sameAsShipping}
            onChange={switchAddress}
          />
          <label
            htmlFor="sameAsShipping"
            css={`
              font-weight: 500;
            `}
          >
            Same as shipping address
          </label>
        </$.Row>
      </label>
      <label htmlFor={"differentBillingAddress"}>
        <$.Row
          css={`
            padding: 1.14286em;
            cursor: pointer;
            border-top: 1px solid
              ${({ theme }) => theme.checkout.sideColors.border};
          `}
        >
          <RadioPick
            id={"differentBillingAddress"}
            name="radio-shipping"
            checked={!billingAddress.sameAsShipping}
            onChange={switchAddress}
          />
          <label
            htmlFor="differentBillingAddress"
            css={`
              font-weight: 500;
            `}
          >
            Use a different billing address
          </label>
        </$.Row>
      </label>
      {!billingAddress.sameAsShipping && (
        <$.Row
          css={`
            padding: 0.71429em 1.14286em;
            background-color: ${({ theme }) =>
              theme.checkout.sideColors.background};
            cursor: pointer;
            border-top: 1px solid
              ${({ theme }) => theme.checkout.sideColors.border};
          `}
        >
          <ShippingAddress
            details={billingAddress.details}
            handleChange={handleBillingAddressChange}
          />
        </$.Row>
      )}
    </$.Table>
  </$.BillingAddress>
);

export default BillingAddress;
