import { useState } from "react";
const { getCode } = require("country-list");
import $ from "./_Payment";
import Table from "./Table";
import RadioPick from "./Radio";
import ShippingAddress from "./ShippingAddress";
import { useStore } from "../../utils/contextStore";
import AlertIcon from "../Icons/Alert";
import StripeForm from "./StripeForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [store, dispatch] = useStore();

  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    details: {
      name: { value: "", error: "" },
      surname: { value: "", error: "" },
      address: { value: "", error: "" },
      addressOptional: { value: "", error: "" },
      city: { value: "", error: "" },
      country: { value: "US", error: "" },
      postcode: { value: "", error: "" },
    },
  });

  const switchAddress = () =>
    setBillingAddress((prevState) => ({
      ...prevState,
      sameAsShipping: !prevState.sameAsShipping,
    }));
  const handleBillingAddressChange = (e) => {
    let [name, value] = [e.target.name, e.target.value];
    if (name === "country") {
      value = getCode(value);
    }
    setBillingAddress((prevState) => ({
      ...prevState,
      details: { ...prevState.details, [name]: { value, error: "" } },
    }));
  };
  return (
    <$.Wrapper>
      <Table
        details={store.checkout.details}
        shipping={store.checkout.selectedShipping}
      />
      <$.Payment>
        <$.Information>
          <$.H2>Payment</$.H2>
          <p>All transactions are secure and encrypted.</p>
        </$.Information>

        <$.Warning aria-atomic="true" aria-live="polite">
          <span>
            <AlertIcon />
          </span>
          This store can't accept real orders or real payments.
        </$.Warning>
        <Elements stripe={stripePromise}>
          <StripeForm />
        </Elements>
      </$.Payment>
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
    </$.Wrapper>
  );
};

export default Payment;
