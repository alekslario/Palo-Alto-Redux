import Link from "next/link";
import { useState } from "react";
const { getData, overwrite } = require("country-list");
import $ from "./_Information";
import Input from "./Input";
import CheckBox from "./Checkbox";
overwrite([
  {
    code: "GB",
    name: "United Kingdom"
  },
  {
    code: "US",
    name: "United States"
  }
]);

const Information = () => {
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
          id="checkout_email"
        />
        <$.CheckBoxWrapper>
          <CheckBox id="checkout_buyer_accepts_marketing" />
          <label htmlFor="checkout_buyer_accepts_marketing">
            Keep me up to date on news and exclusive offers
          </label>
        </$.CheckBoxWrapper>
        <$.ShippingAddress>
          <$.H2>Shipping Address</$.H2>
          <$.Row
            css={`
              flex-direction: column;
              @media (min-width: 750px) {
                flex-direction: row;
              }
            `}
          >
            <Input
              position="left"
              width="50%"
              placeholder="First name (optional)"
              autoComplete="given-name shipping"
              autoCorrect="off"
              size="30"
              type="text"
              id="checkout_shipping_address_first_name"
            />
            <Input
              position="right"
              width="50%"
              placeholder="Last name"
              autoComplete="family-name shipping"
              required
              autoCorrect="off"
              size="30"
              type="text"
              id="checkout_shipping_address_last_name"
            />
          </$.Row>
          <Input
            placeholder="Address"
            autoComplete="shipping address-line1"
            autoCorrect="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            required
            size="30"
            type="text"
            id="checkout_shipping_address_address1"
            aria-haspopup="false"
          />
          <Input
            placeholder="Apartment, suite, etc. (optional)"
            autoComplete="shipping address-line2"
            autocorrect="off"
            size="30"
            type="text"
            id="checkout_shipping_address_address2"
          />
          <Input
            placeholder="City"
            autoComplete="shipping address-level2"
            autocorrect="off"
            required
            size="30"
            type="text"
            id="checkout_shipping_address_city"
          />
          <$.Row
            css={`
              flex-direction: column;
              @media (min-width: 750px) {
                flex-direction: row;
              }
            `}
          >
            <$.Selector width="50%" position="left">
              <label htmlFor="checkout_shipping_address_country">
                Country/Region
              </label>
              <select
                size="1"
                autoComplete="shipping country"
                aria-required="true"
                id="checkout_shipping_address_country"
                defaultValue="United States"
              >
                <option data-code="GB" value="United Kingdom">
                  United Kingdom
                </option>
                <option data-code="US" value="United States">
                  United States
                </option>
                <option data-code="CA" value="Canada">
                  Canada
                </option>
                <option disabled="disabled" value="---">
                  ---
                </option>
                {getData().map(({ name, code }) => (
                  <option key={code} data-code={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <div>
                <svg
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 10 10"
                >
                  <path d="M0 3h10L5 8" fillRule="nonzero"></path>
                </svg>
              </div>
            </$.Selector>

            <Input
              position="right"
              width="50%"
              placeholder="Postcode"
              autoComplete="shipping postal-code"
              autocorrect="off"
              aria-required="true"
              size="30"
              type="text"
              id="checkout_shipping_address_zip"
            />
          </$.Row>
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
