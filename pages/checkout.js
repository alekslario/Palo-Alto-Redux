import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
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
const Checkout = ({ user }) => {
  const [store, dispatch] = useStore();
  const [products] = useDeliverCart();
  const [shipping] = useFetchEntries({
    dependency: [],
    content_type: "shipping",
  });
  const { cartTotal, stripeTotal } = useMemo(
    () =>
      calculateCartTotal(products, store.checkout.selectedShipping.price || 0),
    [products, store.checkout.selectedShipping.price]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && shipping.length > 0) {
      dispatch({
        type: "CHECKOUT_ADD_SHIPPING_FARES",
        shipping: shipping[0].fields.shippingPricing,
      });
    }
  }, [shipping]);
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
          {store.checkout.step === "payment" && (
            <Payment stripeTotal={stripeTotal} />
          )}
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
