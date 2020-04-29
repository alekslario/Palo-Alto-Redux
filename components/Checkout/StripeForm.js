import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import $ from "./_StripeForm";
import StripeInput from "./StripeInput";
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
};
const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [{ focus, complete, error }, setInputState] = useState({
    focus: false,
    complete: false,
    error: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("[PaymentMethod]", payload);
  };

  return (
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
  );
};

export default StripeForm;
