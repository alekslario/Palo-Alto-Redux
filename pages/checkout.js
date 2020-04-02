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
      <div
        css={`
          width: 100%;
          height: 100%;
          max-width: 40em;
          margin: 0 auto;
          @media (min-width: 1000px) {
            width: 58%;
          }
          & > header,
          div,
          ul {
            max-width: 40em;
            margin: 0 auto;
          }
        `}
      >
        <Header />
        <Navigation stepHandler={stepHandler} active={step} />
        <Information />
      </div>
      <div
        css={`
          width: 100%;
          height: 100%;

          /* background-color: ${({ theme }) =>
            theme.checkout.sideColors.background};
          box-shadow: 1px 0 0
            ${({ theme }) =>
              theme.checkout.sideColors.backgroundBorder} inset; */
          @media (min-width: 1000px) {
            width: 42%;
          }
          & > header,
          div,
          ul {
            max-width: 40em;
            margin: 0 auto;
          }
          position:relative;
          & :after{
            content: "";
    display: block;
    width: 300%;
    position: absolute;
    top: 0;
    bottom: 0;
    background: #fafafa;
    z-index: -1;

    box-shadow: 0 -1px 0 #e1e1e1 inset;
          }
        `}
      >
        <Summary />
      </div>
      <Header mobile={true} />
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
