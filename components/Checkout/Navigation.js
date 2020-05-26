import $ from "./_Navigation";
import Caret from "../Icons/Caret";
import { useRouter } from "next/router";
import { useStore } from "../../utils/contextStore";
import formValidation from "../../utils/formValidation";
const text = {
  information: { back: "cart", forth: "shipping" },
  shipping: { back: "information", forth: "payment" },
  payment: { back: "shipping" },
};
const Navigation = ({ toPay, stripeLoaded }) => {
  const router = useRouter();
  const [store, dispatch] = useStore();
  const goBack = () => {
    if (store.checkout.step === "information") {
      router.push("/cart");
    } else {
      dispatch({
        type: "CHECKOUT_TAKE_A_STEP",
        step: text[store.checkout.step].back,
      });
    }
  };
  const goForth = () => {
    if (store.checkout.step === "information") {
      const errors = formValidation(store.checkout.details);
      if (errors.length === 0) {
        dispatch({
          type: "CHECKOUT_TAKE_A_STEP",
          step: "shipping",
        });
      } else {
        dispatch({
          type: "CHECKOUT_SET_ERRORS",
          errors,
        });
      }
    } else if (store.checkout.step === "shipping") {
      dispatch({
        type: "CHECKOUT_TAKE_A_STEP",
        step: text[store.checkout.step].forth,
      });
    } else if (stripeLoaded) {
      toPay();
    }
  };
  return (
    <$.Navigation>
      <$.ButtonBack onClick={goBack}>
        <span
          css={`
            margin-right: 0.25em;
            display: block;
            width: 10px;
          `}
        >
          <Caret />
        </span>

        <span
          css={`
            white-space: nowrap;
          `}
        >
          Return to {text[store.checkout.step].back}
        </span>
      </$.ButtonBack>
      <$.ButtonForth
        name="submit"
        onClick={goForth}
        disabled={stripeLoaded === false ? true : false}
      >
        {store.checkout.step === "payment"
          ? "Pay now"
          : "Continue to " + text[store.checkout.step].forth}
      </$.ButtonForth>
    </$.Navigation>
  );
};

export default Navigation;
