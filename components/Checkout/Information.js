import { useEffect } from "react";
import Link from "next/link";
import { useStore } from "../../utils/contextStore";
const { getCode, getName } = require("country-list");
import Input from "./Input";
import $ from "./_Information";
import CheckBox from "./CheckBox";
import ShippingAddress from "./ShippingAddress";
import Navigation from "./Navigation";
const Information = () => {
  const [store, dispatch] = useStore();

  useEffect(() => {
    if (store.user?.address.length > 0 && !store.checkout.details.name.value) {
      const { _id, ...rest } = store.user.address[0];
      dispatch({
        type: "CHECKOUT_SHIPPING_ADDRESS_CHANGE",
        changes: [
          ...Object.entries(rest).reduce(
            (acc, [name, value]) => (acc.push({ name, value }), acc),
            []
          ),
          { name: "email", value: store.user?.email },
        ],
      });
    }
  }, [store.user]);

  const handleChange = (e) => {
    let [name, value] = [e.target.name, e.target.value];
    if (name === "country") {
      value = getCode(value);
    }
    dispatch({
      type: "CHECKOUT_SHIPPING_ADDRESS_CHANGE",
      changes: [{ name, value }],
    });
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
          {!store.user && (
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
          )}
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
          <CheckBox
            id="checkout_buyer_accepts_marketing"
            checked={store.checkout.saveEmail}
            onChange={() => dispatch({ type: "TOGGLE_SAVE_EMAIL" })}
          />
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
            <CheckBox
              id="checkout_remember_me"
              checked={store.checkout.saveShipping}
              onChange={() => dispatch({ type: "TOGGLE_SAVE_SHIPPING" })}
            />
            <label htmlFor="checkout_remember_me">
              Save this information for next time
            </label>
          </$.CheckBoxWrapper>
        </$.ShippingAddress>
      </$.Form>
      <Navigation />
    </>
  );
};

export default Information;
