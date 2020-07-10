import $ from "./_PaymentMethods";
import { useEffect } from "react";
import RadioPick from "./Radio";
import { useStore } from "../../utils/contextStore";
import { logoStripeMap } from "../Icons/PaymentIcons";

const PaymentMethods = ({ children }) => {
  const [store, dispatch] = useStore();
  useEffect(() => {
    if (
      !store.checkout.paymentMethod &&
      store.user?.stripePaymentMethods.length > 0
    ) {
      dispatch({
        type: "ADD_CHECKOUT_PAYMENT_METHOD",
        paymentMethod: store.user.stripePaymentMethods[0].payment_method,
      });
    }
  }, []);

  const handlePick = (paymentMethod) => {
    if (store.checkout.paymentMethod !== paymentMethod)
      dispatch({ type: "ADD_CHECKOUT_PAYMENT_METHOD", paymentMethod });
  };
  return (
    <>
      {store.user?.stripePaymentMethods.length > 0 ? (
        <>
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
              (
                { payment_method, brand, exp_month, exp_year, last4 },
                index
              ) => (
                <label htmlFor={payment_method} key={index}>
                  <$.TableRow
                    css={`
                      align-items: center;
                      & span {
                        white-space: nowrap;
                      }
                    `}
                  >
                    <RadioPick
                      id={payment_method}
                      name="radio-payment"
                      checked={store.checkout.paymentMethod === payment_method}
                      onChange={() => handlePick(payment_method)}
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
            <label htmlFor={"another-payment"}>
              <$.TableRow
                css={`
                  border-bottom: none;
                `}
              >
                <RadioPick
                  id={"another-payment"}
                  name="radio-payment"
                  checked={store.checkout.paymentMethod === "another"}
                  onChange={() => handlePick("another")}
                />
                <span>Pay with another card</span>
              </$.TableRow>
            </label>
          </$.Table>
          {store.checkout.paymentMethod === "another" && children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default PaymentMethods;
