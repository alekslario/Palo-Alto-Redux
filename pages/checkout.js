import { useEffect, useMemo } from "react";
import cookie from "js-cookie";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useStore } from "../utils/contextStore";
import $ from "../components/Checkout/_Checkout";
import calculateCartTotal from "../utils/calculateCartTotal";
import useDeliverCart from "../utils/useDeliverCart";
import BreadCrumbs from "../components/Checkout/BreadCrumbs";
import dynamic from "next/dynamic";
import Summary from "../components/Checkout/Summary";
import Header from "../components/Checkout/Header";
import Shipping from "../components/Checkout/Shipping";
const Payment = dynamic(() => import("../components/Checkout/Payment"));
import SummaryButton from "../components/Checkout/SummaryButton";
import Information from "../components/Checkout/Information";
import { useFetchEntries } from "../utils/useFetchEntries";
const Checkout = () => {
  const [store, dispatch] = useStore();
  const [products] = useDeliverCart();
  const [shipping] = useFetchEntries({
    content_type: "shipping",
  });

  useEffect(() => {
    //adding shipping fares to the store as we fetch from contentful
    if (typeof window !== "undefined" && shipping.length > 0) {
      dispatch({
        type: "CHECKOUT_ADD_SHIPPING_FARES",
        shipping: shipping[0].fields.shippingPricing,
      });
    }
  }, [shipping]);

  const { cartTotal, stripeTotal } = useMemo(
    () =>
      calculateCartTotal(products, store.checkout.selectedShipping.price || 0),
    [products, store.checkout.selectedShipping.price]
  );

  useEffect(() => {
    if (!stripeTotal) return;
    let didCancel = false;
    const getStripeIntent = async () => {
      const token = cookie.get("token");
      const payload = {
        clientSecret: store.checkout.clientSecret,
        cart: store.cart,
        total: stripeTotal,
        ...(store.checkout.selectedShipping.price
          ? {
              shipping: {
                ...store.checkout.selectedShipping,
                region: store.checkout.details.country.value,
              },
            }
          : {}),
      };
      console.log(payload);
      const url = `${baseUrl}/api/payment_intent`;
      const response = await axios.post(url, payload, {
        ...(token ? { headers: { Authorization: token } } : {}),
      });

      console.log(response.data);
      if (!didCancel)
        dispatch({ type: "UPDATE_CLIENT_SECRET", clientSecret: response.data });
    };
    getStripeIntent();
    return () => {
      didCancel = true;
    };
  }, [stripeTotal]);

  return (
    <$.Wrapper>
      <$.ContentMobileOnly>
        <Header padding="1.9em 0" />
      </$.ContentMobileOnly>

      <SummaryButton
        cartTotal={cartTotal}
        products={products}
        shipping={store.checkout.selectedShipping.price || 0}
      />
      <$.Content>
        <$.Main>
          <Header desktop={true} />

          <BreadCrumbs />
          {store.checkout.step === "information" && <Information />}
          {store.checkout.step === "shipping" && <Shipping />}
          {store.checkout.step === "payment" && <Payment products={products} />}
          <$.Footer>All rights reserved Palo Alto Redux</$.Footer>
        </$.Main>
        <$.Side desktop={true}>
          <Summary
            cartTotal={cartTotal}
            products={products}
            shipping={store.checkout.selectedShipping.price || 0}
          />
        </$.Side>
      </$.Content>
    </$.Wrapper>
  );
};

export default Checkout;
