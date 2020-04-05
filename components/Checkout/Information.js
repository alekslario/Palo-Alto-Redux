import Link from "next/link";
import $ from "./_Information";
import Input from "./Input";
import CountrySelector from "./CountrySelector";
const Information = () => (
  <$.Wrapper>
    <$.Row
      css={`
        justify-content: space-between;
      `}
    >
      <div>Contact Information</div>
      <div>
        <span>Already have an account?</span>
        <Link href="/">
          <a
            css={`
              color: ${({ theme }) => theme.checkout.colors.attention};
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
      autocomplete="email"
      autoFocus={true}
      aria-describedby=""
      aria-required={true}
      size="30"
      type="email"
      id="checkout_email"
    />
    <h2>Shipping Address</h2>
    <$.ShippingAddress>
      <$.Row>
        <Input
          width="50%"
          placeholder="First name (optional)"
          autocomplete="given-name shipping"
          autoCorrect="off"
          size="30"
          type="text"
          id="checkout_shipping_address_first_name"
        />
        <Input
          width="50%"
          placeholder="Last name"
          autocomplete="family-name shipping"
          required
          autoCorrect="off"
          size="30"
          type="text"
          id="checkout_email"
        />
      </$.Row>
      <Input
        placeholder="Address"
        autocomplete="shipping address-line1"
        autocorrect="off"
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
        autocomplete="shipping address-line2"
        autocorrect="off"
        size="30"
        type="text"
        id="checkout_shipping_address_address2"
      />
      <Input
        placeholder="City"
        autocomplete="shipping address-level2"
        autocorrect="off"
        required
        size="30"
        type="text"
        id="checkout_shipping_address_city"
      />
      <CountrySelector />
    </$.ShippingAddress>
  </$.Wrapper>
);

export default Information;
