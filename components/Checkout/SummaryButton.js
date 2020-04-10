import $ from "./_SummaryButton";
import CartIcon from "../Icons/Cart";
import CaretIcon from "../Icons/Caret";
import { useStore } from "../../utils/contextStore";
const SummaryButton = ({ cartTotal }) => {
  const [store, dispatch] = useStore();
  const handleClick = () => dispatch({ type: "TOGGLE_CHECKOUT_COLLAPSE" });
  return (
    <$.ShowMoreButton onClick={handleClick}>
      <span>
        <span
          css={`
            color: ${({ theme }) => theme.checkout.colors.attention};
            fill: currentColor;
            display: flex;
          `}
        >
          <$.CartIcon>
            <CartIcon />
          </$.CartIcon>
          <span
            css={`
              padding-right: 0.25em;
            `}
          >
            Show order summary
          </span>
          <$.CaretIcon>
            <CaretIcon />
          </$.CaretIcon>
        </span>
        <$.Total>{cartTotal}</$.Total>
      </span>
    </$.ShowMoreButton>
  );
};

export default SummaryButton;
