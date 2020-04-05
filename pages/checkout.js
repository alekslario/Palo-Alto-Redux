import { useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../utils/contextStore";
import $ from "../components/Checkout/_Checkout";
import Summary from "../components/Checkout/Summary";
import Information from "../components/Checkout/Information";
import Shipping from "../components/Checkout/Shipping";
import Payment from "../components/Checkout/Payment";
import Navigation from "../components/Checkout/Navigation";
import Header from "../components/Checkout/Header";

const Checkout = ({ user }) => {
  const [step, setStep] = useState("information");
  const [store, dispatch] = useStore();
  const router = useRouter();
  const stepHandler = name => setStep(name);
  return (
    <$.Wrapper>
      <$.Main>
        <Header />
        <Navigation stepHandler={stepHandler} active={step} />
        <Information />
        <$.Footer>All rights reserved Palo Alto Redux</$.Footer>
      </$.Main>
      <$.Side>
        <Summary />
      </$.Side>
      <div
        css={`
          display: block;
          @media (min-width: 1000px) {
            display: none;
          }
        `}
      >
        <Header />
      </div>
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
