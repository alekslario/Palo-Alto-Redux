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
const Summary = dynamic(() => import("../components/Checkout/Summary"), {
  ssr: false
});
const Header = dynamic(() => import("../components/Checkout/Header"), {
  ssr: false
});
const Shipping = dynamic(() => import("../components/Checkout/Shipping"));
const Payment = dynamic(() => import("../components/Checkout/Payment"));
const Information = dynamic(() => import("../components/Checkout/Information"));
const SummaryButton = dynamic(() =>
  import("../components/Checkout/SummaryButton")
);
const shipping = 0;
const Checkout = ({ user }) => {
  const [step, setStep] = useState("information");
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 999px)").matches
  );
  const [store, dispatch] = useStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 999px)");
    const handleResize = e => setMobile(e.matches ? true : false);
    mql.addListener(handleResize);
    return () => mql.removeListener(handleResize);
  }, []);

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
      {mobile && <Header padding="1.5em 0" />}
      {mobile && (
        <SummaryButton
          cartTotal={cartTotal}
          products={products}
          shipping={shipping}
        />
      )}
      <$.Content>
        <$.Main>
          {!mobile && <Header />}

          <BreadCrumbs stepHandler={stepHandler} step={step} />
          {step === "information" && <Information />}
          {step === "shipping" && <Shipping />}
          {step === "payment" && <Payment />}
          <Navigation stepHandler={stepHandler} step={step} />
          <$.Footer>All rights reserved Palo Alto Redux</$.Footer>
        </$.Main>
        {!mobile && (
          <$.Side>
            <Summary
              cartTotal={cartTotal}
              products={products}
              shipping={shipping}
            />
          </$.Side>
        )}
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
