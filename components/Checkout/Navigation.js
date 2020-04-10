import $ from "./_Navigation";
import Caret from "../Icons/Caret";

const text = {
  information: { back: "cart", forth: "shipping" },
  shipping: { back: "information", forth: "payment" },
  payment: { back: "shipping", forth: "Pay" }
};
const Navigation = ({ stepHandler, step = "information" }) => {
  return (
    <$.Navigation>
      <$.ButtonBack onClick={() => stepHandler(text[step].back)}>
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
          Return to {text[step].back}
        </span>
      </$.ButtonBack>
      <$.ButtonForth onClick={() => stepHandler(text[step].forth)}>
        {step === "payment"
          ? text[step].forth
          : `Continue to ${text[step].forth}`}
      </$.ButtonForth>
    </$.Navigation>
  );
};

export default Navigation;
