import { useEffect, useState, useMemo } from "react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Checkout/_Checkout";
import calculateCartTotal from "../utils/calculateCartTotal";
import useDeliverCart from "../utils/useDeliverCart";
import BreadCrumbs from "../components/Checkout/BreadCrumbs";
import dynamic from "next/dynamic";
import Navigation from "../components/Checkout/Navigation";
import Summary from "../components/Checkout/Summary";
import Header from "../components/Checkout/Header";
import Shipping from "../components/Checkout/Shipping";
const Payment = dynamic(() => import("../components/Checkout/Payment"));
import SummaryButton from "../components/Checkout/SummaryButton";
import Information from "../components/Checkout/Information";
const shipping = 0;
const Checkout = ({ user }) => {
  const [step, setStep] = useState("shipping");
  const [store, dispatch] = useStore();
  const router = useRouter();

  const [products] = useDeliverCart();
  const { cartTotal } = useMemo(() => calculateCartTotal(products, shipping), [
    products,
    shipping
  ]);

  const stepHandler = name => {
    if (typeof window !== "undefined" && name === "cart") {
      router.push("/");
    } else {
      setStep(name);
    }
  };
  return (
    <$.Wrapper>
      <$.ContentMobileOnly>
        <Header padding="1.9em 0" />
      </$.ContentMobileOnly>

      <SummaryButton
        cartTotal={cartTotal}
        products={products}
        shipping={shipping}
      />
      <$.Content>
        <$.Main>
          <Header desktop={true} />

          <BreadCrumbs stepHandler={stepHandler} step={step} />
          {step === "information" && <Information />}
          {step === "shipping" && <Shipping />}
          {step === "payment" && <Payment />}
          <Navigation stepHandler={stepHandler} step={step} />
          <$.Footer>All rights reserved Palo Alto Redux</$.Footer>
        </$.Main>
        <$.Side desktop={true}>
          <Summary
            cartTotal={cartTotal}
            products={products}
            shipping={shipping}
          />
        </$.Side>
      </$.Content>
    </$.Wrapper>
  );
};

Checkout.getInitialProps = async (ctx, token) => {
  if (!token) {
    return {};
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/account`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Checkout;
