import { useState } from "react";
import $ from "./_CardsList";
import SubmitButton from "../_App/SubmitButton";
import CheckBox from "../Checkout/CheckBox";
import contactServer from "../../utils/contactServer";
import cookie from "js-cookie";
import { useStore } from "../../utils/contextStore";
import { logoStripeMap } from "../../components/Icons/PaymentIcons";
import { useFormStateBoolean } from "../../utils/useFormState";

import { blackCheckBoxStyle } from "./AddressList";
const CardsList = ({ handleReturn }) => {
  const [store, dispatch] = useStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkBoxes, setCheckBox] = useFormStateBoolean(
    store.user?.stripePaymentMethods.reduce(
      (acc, { payment_method }) => ((acc[payment_method] = false), acc),
      {}
    )
  );
  const handleDeleteCards = async () => {
    if (store.user?.stripePaymentMethods.length === 0) return;
    setError("");
    setLoading(true);
    const token = cookie.get("token");
    const response = await contactServer({
      data: {
        stripePaymentMethodsIds: Object.entries(checkBoxes).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key);
            return acc;
          },
          []
        ),
      },
      method: "DELETE",
      auth: token,
      route: "account",
    });
    setLoading(false);

    if (response.status === 200) {
      dispatch({ type: "SET_USER", user: response.data.user });
    } else {
      setError(response.data.message);
    }
  };
  return (
    <>
      <$.Column
        css={`
          padding: 50px 0;
          justify-content: space-between;
          @media (min-width: 768px) {
            flex-direction: row;
          }
        `}
      >
        <div>
          <$.Title
            css={`
              display: block;
              margin: 0;
              @media (min-width: 992px) {
                margin: 0;
              }
            `}
          >
            Your Cards
          </$.Title>
          <button
            onClick={handleReturn}
            css={`
              margin-bottom: 10px;
              @media (min-width: 768px) {
                margin-bottom: 0;
              }
            `}
          >
            Return to Account Details
          </button>
        </div>
        <$.Row
          css={`
            justify-content: left;
            @media (min-width: 768px) {
              flex-direction: column;
              justify-content: center;
            }
          `}
        >
          <SubmitButton
            loading={loading}
            css={`
              text-transform: uppercase;
              margin-bottom: 50px;
              @media (min-width: 768px) {
                margin: 0;
              }
            `}
            onClick={handleDeleteCards}
          >
            Forget
          </SubmitButton>
        </$.Row>
      </$.Column>
      {error && <p>{error}</p>}
      {store.user?.stripePaymentMethods.length > 0 ? (
        <$.Table
          css={`
            margin-bottom: 22px;
          `}
        >
          <$.Header>
            <div>Your credit cards</div>
            <span>Expiry date</span>
          </$.Header>
          {store.user.stripePaymentMethods.map(
            ({ payment_method, brand, exp_month, exp_year, last4 }, index) => (
              <label htmlFor={payment_method} key={index}>
                <$.TableRow
                  css={`
                    align-items: center;
                    & span {
                      white-space: nowrap;
                    }
                  `}
                >
                  <CheckBox
                    id={payment_method}
                    name={payment_method}
                    checked={checkBoxes[payment_method]}
                    onChange={setCheckBox}
                    style={blackCheckBoxStyle}
                  />
                  <$.Row
                    css={`
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    `}
                  >
                    <$.Row
                      css={`
                        align-items: center;
                        width: 100%;
                        span,
                        div {
                          margin-right: 10px;
                        }
                        flex-wrap: wrap;
                      `}
                    >
                      <$.Column>{logoStripeMap[brand]}</$.Column>
                      <span>ending in {last4}</span>
                    </$.Row>
                    <span>
                      {exp_month}/{exp_year}
                    </span>
                  </$.Row>
                </$.TableRow>
              </label>
            )
          )}
        </$.Table>
      ) : (
        <p>No cards attached to your account.</p>
      )}
      <p
        css={`
          font-size: 13px;
        `}
      >
        We do not store credit card information.<br></br>
        We take credit card data security very seriously, and we do not have
        access to your credit card information. We use Stripe to securely handle
        credit card information. Stripe is certified to PCI Service Provider
        Level 1.
      </p>
    </>
  );
};

export default CardsList;
