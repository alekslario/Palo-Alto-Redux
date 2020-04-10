import { useEffect, useState, useMemo } from "react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Checkout/_Checkout";

import calculateCartTotal from "../utils/calculateCartTotal";
import useDeliverCart from "../utils/useDeliverCart";

import Summary from "../components/Checkout/Summary";
import Information from "../components/Checkout/Information";
import Shipping from "../components/Checkout/Shipping";
import Payment from "../components/Checkout/Payment";
import BreadCrumbs from "../components/Checkout/BreadCrumbs";
import Header from "../components/Checkout/Header";
import Navigation from "../components/Checkout/Navigation";
import SummaryButton from "../components/Checkout/SummaryButton";

const shipping = 0;

const Checkout = ({ user }) => {
  const [step, setStep] = useState("information");
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
      <div
        css={`
          display: block;
          @media (min-width: 1000px) {
            display: none;
          }
        `}
      >
        <Header />
        <SummaryButton cartTotal={cartTotal} />
        <$.Content>
          <$.Side>
            <Summary
              cartTotal={cartTotal}
              products={products}
              shipping={shipping}
            />
          </$.Side>
        </$.Content>
      </div>
      <$.Content>
        <$.Main>
          <div
            css={`
              display: none;
              @media (min-width: 1000px) {
                display: block;
              }
            `}
          >
            <Header />
          </div>

          <BreadCrumbs stepHandler={stepHandler} step={step} />
          {step === "information" && <Information />}
          {step === "shipping" && <Shipping />}
          {step === "payment" && <Payment />}
          <Navigation stepHandler={stepHandler} step={step} />
          <$.Footer>All rights reserved Palo Alto Redux</$.Footer>
        </$.Main>
        <$.Side>
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
