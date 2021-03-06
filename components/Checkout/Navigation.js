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
const Navigation = ({ toPay, stripeLoaded, processing }) => {
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
      //form doesn't contain province, phone...yet
      const { province, phone, ...rest } = store.checkout.details;
      const errors = formValidation(rest);
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
        isLoading={
          stripeLoaded === false ||
          processing ||
          (store.checkout.fetchingIntent && store.checkout.step === "payment")
        }
        disabled={Object.keys(store.cart).length === 0}
      >
        {store.checkout.step === "payment"
          ? "Pay now"
          : "Continue to " + text[store.checkout.step].forth}
      </$.ButtonForth>
    </$.Navigation>
  );
};

export default Navigation;
