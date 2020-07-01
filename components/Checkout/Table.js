import $ from "./_Table";
import { css } from "styled-components";
const { getName } = require("country-list");
import formatMoney from "../../utils/formatMoney";
import { useStore } from "../../utils/contextStore";
const Row = ({ label, text, index }) => {
  const [_, dispatch] = useStore();
  return (
    <$.Row
      css={`
        ${index > 0
          ? css`
              margin-top: 0.85714em;
              padding-top: 0.85714em;
              border-top: 1px solid
                ${({ theme }) => theme.checkout.sideColors.gamma};
            `
          : ""}
      `}
    >
      <$.Column
        css={`
          flex: 1;
          @media (min-width: 750px) {
            flex-direction: row;
          }
        `}
      >
        <$.FieldName>{label}</$.FieldName>
        <$.Record>{text}</$.Record>
      </$.Column>
      {index < 2 && (
        <$.Action>
          <button
            onClick={() =>
              dispatch({ type: "CHECKOUT_TAKE_A_STEP", step: "information" })
            }
          >
            Change
          </button>
        </$.Action>
      )}
    </$.Row>
  );
};
const Table = ({ details, shipping }) => {
  const { address, addressOptional, city, country, postcode } = details;
  return (
    <$.Table>
      <Row label={"Contact"} text={details.email.value} index={0} />
      <Row
        index={1}
        label={"Ship to"}
        text={`${address.value}${
          addressOptional.value ? ", " + addressOptional.value : ""
        }, ${city.value}, ${getName(country.value)}, ${postcode.value}`}
      />
      {shipping && (
        <Row
          label={"Method"}
          text={
            <>
              {shipping.name}&nbsp;&middot;&nbsp;
              <strong>{formatMoney(shipping.price)}</strong>
            </>
          }
          index={2}
        />
      )}
    </$.Table>
  );
};

export default Table;
