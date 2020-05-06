import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";
const { getCode } = require("country-list");
import $ from "./_Payment";
import axios from "axios";
import Table from "./Table";
import { useStore } from "../../utils/contextStore";
import AlertIcon from "../Icons/Alert";
import LoadingPlaceholder from "../_App/LoadingPlaceholder";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import BillingAddress from "./BillingAddress";
import Navigation from "./Navigation";
const options = {
  style: {
    base: {
      fontSize: "14px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif',
      "::placeholder": {
        color: "#737373",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};

const Payment = ({ stripeTotal }) => {
  const [store, dispatch] = useStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loaded, setLoaded] = useState(false);
  const [stripeError, setStripeError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [{ focus, complete, error }, setInputState] = useState({
    focus: false,
    complete: false,
    error: false,
  });
  const [clientSecret, setClientSecret] = useState("");

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

  useEffect(() => {
    const getStripeIntent = async () => {
      console.log("fetching intent");
      const token = cookie.get("token");
      const payload = {
        cart: store.cart,
        total: stripeTotal,
        shipping: {
          ...store.checkout.selectedShipping,
          region: store.checkout.details.country.value,
        },
        ...(token ? { headers: { Authorization: token } } : {}),
      };
      const url = `${baseUrl}/api/payment_intent`;
      const response = await axios.post(url, payload);
      console.log(response.data);
      setClientSecret(response.data);
    };
    getStripeIntent();
  }, []);

  const getAddress = (shippingA = true) => {
    const details = shippingA ? store.checkout.details : billingAddress.details;
    const {
      name,
      surname,
      address,
      addressOptional,
      city,
      country,
      postcode,
    } = details;
    return {
      name: `${name.value} ${surname.value}`,
      address: {
        line1: address.value,
        line2: addressOptional.value,
        city: city.value,
        country: country.value,
        postal_code: postcode.value,
      },
    };
  };

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

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: store.checkout.details.email.value,
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: getAddress(billingAddress.sameAsShipping),
      },
      shipping: getAddress(),
    });
    if (payload.error) {
      setSuccess("");
      setStripeError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setSuccess("Done!");
      setStripeError(null);
      setProcessing(false);
    }
  };

  return (
    <>
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
          <form
            css={`
              position: relative;
            `}
          >
            {!loaded && (
              <LoadingPlaceholder
                css={`
                  width: 100%;
                  height: 44.77px;
                  border-radius: 5px;
                  margin: 0.42857em 0;
                  position: absolute;
                  top: 0;
                  z-index: 10;
                `}
              />
            )}
            <label>
              <$.LabelText>Card details</$.LabelText>
              <StripeInput focus={focus} error={error}>
                <CardElement
                  options={options}
                  onReady={() => {
                    setLoaded(true);
                  }}
                  onChange={({ complete, error }) => {
                    setInputState((prevState) => ({
                      ...prevState,
                      complete,
                      error,
                    }));
                  }}
                  onBlur={() => {
                    setInputState((prevState) => ({
                      ...prevState,
                      focus: false,
                    }));
                  }}
                  onFocus={() =>
                    setInputState((prevState) => ({
                      ...prevState,
                      focus: true,
                    }))
                  }
                />
              </StripeInput>
            </label>
          </form>
          {stripeError && <span>{stripeError}</span>}
          {processing && <span>processing</span>}
          {success && <span>{success}</span>}
        </$.Payment>
        <BillingAddress
          switchAddress={switchAddress}
          billingAddress={billingAddress}
          handleBillingAddressChange={handleBillingAddressChange}
        />
      </$.Wrapper>
      <Navigation toPay={handleSubmit} stripeLoaded={stripe} />
    </>
  );
};

export default Payment;
