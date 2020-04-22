import Link from "next/link";
import { useStore } from "../../utils/contextStore";
const { getCode } = require("country-list");
import Input from "./Input";
import $ from "./_Information";
import CheckBox from "./Checkbox";
import ShippingAddress from "./ShippingAddress";
const Information = () => {
  const [store, dispatch] = useStore();
  const handleChange = e => {
    let [name, value] = [e.target.name, e.target.value];
    if (name === "country") {
      value = getCode(value);
    }
    dispatch({ type: "CHECKOUT_SHIPPING_ADDRESS_CHANGE", name, value });
  };
  return (
    <>
      <$.Form>
        <$.Row
          css={`
            justify-content: space-between;
            margin-bottom: 0.5em;
            flex-wrap: wrap;
            @media (min-width: 750px) {
              margin-bottom: 1em;
            }
          `}
        >
          <div
            css={`
              padding: 0.14286rem 0.57143rem 0.14286rem 0;
              font-size: 1.28571em;
            `}
          >
            Contact Information
          </div>
          <div
            css={`
              padding-bottom: 0.14286rem;
              padding-top: 0.14286rem;
              line-height: 1.5em;
            `}
          >
            <span>Already have an account?</span>
            <Link href="/">
              <a
                css={`
                  margin-left: 4px;
                `}
              >
                Log in
              </a>
            </Link>
          </div>
        </$.Row>
        <Input
          placeholder="Email"
          autoCapitalize="off"
          spellcheck="false"
          autoComplete="email"
          autoFocus={true}
          aria-describedby=""
          aria-required={true}
          size="30"
          type="email"
          name="email"
          id="checkout_email"
          value={store.checkout.details.email.value}
          error={store.checkout.details.email.error}
          onChange={handleChange}
        />
        <$.CheckBoxWrapper>
          <CheckBox id="checkout_buyer_accepts_marketing" />
          <label htmlFor="checkout_buyer_accepts_marketing">
            Keep me up to date on news and exclusive offers
          </label>
        </$.CheckBoxWrapper>
        <$.ShippingAddress>
          <$.H2>Shipping Address</$.H2>
          <ShippingAddress
            details={store.checkout.details}
            handleChange={handleChange}
          />
          <$.CheckBoxWrapper>
            <CheckBox id="checkout_remember_me" />
            <label htmlFor="checkout_remember_me">
              Save this information for next time
            </label>
          </$.CheckBoxWrapper>
        </$.ShippingAddress>
      </$.Form>
    </>
  );
};

export default Information;
