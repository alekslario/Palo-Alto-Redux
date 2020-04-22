import $ from "./_ShippingAddress";
import Input from "./Input";
const { getData, getName, overwrite } = require("country-list");
overwrite([
  {
    code: "GB",
    name: "United Kingdom",
  },
  {
    code: "US",
    name: "United States",
  },
]);

const ShippingAddress = ({ details, handleChange }) => {
  const countryValue = getName(details.country.value);
  return (
    <$.Column
      css={`
        width: 100%;
      `}
    >
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
          placeholder="First name"
          autoComplete="given-name"
          autoCorrect="off"
          size="30"
          type="text"
          name="name"
          value={details.name.value}
          error={details.name.error}
          onChange={handleChange}
          id="checkout_shipping_address_first_name"
        />
        <Input
          position="right"
          placeholder="Last name"
          autoComplete="family-name shipping"
          required
          autoCorrect="off"
          size="30"
          type="text"
          name="surname"
          value={details.surname.value}
          error={details.surname.error}
          onChange={handleChange}
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
        name="address"
        value={details.address.value}
        error={details.address.error}
        onChange={handleChange}
        id="checkout_shipping_address_address1"
        aria-haspopup="false"
      />
      <Input
        placeholder="Apartment, suite, etc. (optional)"
        autoComplete="shipping address-line2"
        autocorrect="off"
        size="30"
        type="text"
        name="addressOptional"
        value={details.addressOptional.value}
        error={details.addressOptional.error}
        onChange={handleChange}
        id="checkout_shipping_address_address2"
      />
      <Input
        placeholder="City"
        autoComplete="shipping address-level2"
        autocorrect="off"
        required
        size="30"
        type="text"
        name="city"
        value={details.city.value}
        error={details.city.error}
        onChange={handleChange}
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
        <$.SelectorWrapper position="left">
          <$.Selector error={details.country.error}>
            <label htmlFor="checkout_shipping_address_country">
              Country/Region
            </label>
            <select
              size="1"
              autoComplete="shipping country"
              aria-required="true"
              name="country"
              value={countryValue}
              onChange={handleChange}
              id="checkout_shipping_address_country"
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
          {details.country.error && <$.Error>{details.country.error}</$.Error>}
        </$.SelectorWrapper>
        <Input
          position="right"
          placeholder="Postcode"
          autoComplete="shipping postal-code"
          autocorrect="off"
          aria-required="true"
          size="30"
          type="text"
          name="postcode"
          value={details.postcode.value}
          error={details.postcode.error}
          onChange={handleChange}
          id="checkout_shipping_address_zip"
        />
      </$.Row>
    </$.Column>
  );
};
export default ShippingAddress;
