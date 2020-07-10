import React, { useState, useEffect } from "react";
const { getCode } = require("country-list");
import $ from "./_Payment";
import Table from "./Table";
import CheckBox from "./CheckBox";
import { useStore } from "../../utils/contextStore";
import AlertIcon from "../Icons/Alert";
import LoadingPlaceholder from "../_App/LoadingPlaceholder";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import BillingAddress from "./BillingAddress";
import Navigation from "./Navigation";
import contactServer from "../../utils/contactServer";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import PaymentMethods from "./PaymentMethods";

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

const Payment = ({ products }) => {
  const router = useRouter();
  const [store, dispatch] = useStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loaded, setLoaded] = useState(false);
  const [stripeError, setStripeError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [{ focus, complete, error }, setInputState] = useState({
    focus: false,
    complete: false,
    error: false,
  });

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
      return;
    }
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(
      store.checkout.clientSecret,
      {
        receipt_email: store.checkout.details.email.value,
        setup_future_usage: store.checkout.savePaymentMethod
          ? "on_session"
          : null,
        payment_method:
          store.checkout.paymentMethod &&
          store.checkout.paymentMethod !== "another"
            ? store.checkout.paymentMethod
            : {
                card: elements.getElement(CardElement),
                billing_details: getAddress(billingAddress.sameAsShipping),
              },
        shipping: getAddress(),
      }
    );
    if (payload.error) {
      setStripeError(`Payment failed. ${payload.error.message}`);
      setProcessing(false);
    } else if (payload.paymentIntent.status === "succeeded") {
      const token = cookie.get("token");
      const response = await contactServer({
        method: "POST",
        auth: token,
        route: "checkout",
        data: {
          cartItems: store.cart,
          paymentIntentId: payload.paymentIntent.id,
          savePaymentMethod: store.checkout.savePaymentMethod,
          ...(store.checkout.saveShipping
            ? {
                saveShipping: true,
                shipAddress: Object.entries(store.checkout.details).reduce(
                  (acc, [key, { value }]) => ((acc[key] = value), acc),
                  {}
                ),
              }
            : {}),
          saveEmail: store.checkout.saveEmail,
        },
      });

      const { orderId, user, cart } = response.data;
      const {
        selectedShipping,
        details: { name, surname, email, ...rest },
      } = store.checkout;
      const shippingDays = selectedShipping.time.match(/\d+/g);
      const boughtItems = products.map((ele) => ele.name).join(", ");
      await router.push({
        pathname: "/thankyou",
        query: {
          orderId,
          name: `${name.value} ${surname.value}`,
          email: email.value,
          boughtItems:
            boughtItems.length > 30
              ? boughtItems.substring(0, 26) + " ..."
              : boughtItems,
          shippingAddress: Object.values(rest)
            .map((ele) => ele.value)
            .filter((x) => x)
            .join(", "),
          delivery_date:
            Date.now() +
            1000 *
              60 *
              60 *
              24 *
              Math.max(...(shippingDays ? shippingDays : [1])),
        },
      });
      dispatch({
        type: "WIPE_CHECKOUT",
        user,
        cart: cart,
      });
    }
  };

  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    processing
      ? window.addEventListener("click", handler, true)
      : window.removeEventListener("click", handler, true);
    return () => window.removeEventListener("click", handler, true);
  }, [processing]);

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
          <PaymentMethods>
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

            <$.CheckBoxWrapper>
              <CheckBox
                id="checkout_remember_me"
                checked={store.checkout.savePaymentMethod}
                onChange={() =>
                  dispatch({ type: "TOGGLE_SAVE_PAYMENT_METHOD" })
                }
              />
              <label htmlFor="checkout_remember_me">
                Save this card for next time
              </label>
            </$.CheckBoxWrapper>
          </PaymentMethods>
          {stripeError && <$.Error>{stripeError}</$.Error>}
        </$.Payment>
        <BillingAddress
          switchAddress={switchAddress}
          billingAddress={billingAddress}
          handleBillingAddressChange={handleBillingAddressChange}
        />
      </$.Wrapper>
      <Navigation
        toPay={handleSubmit}
        processing={processing}
        stripeLoaded={
          (store.checkout.paymentMethod === "another" ? loaded : true) &&
          store.checkout.clientSecret &&
          !!store.checkout.selectedShipping.price
        }
      />
    </>
  );
};

export default Payment;
