import Link from "next/link";
import $ from "./_BreadCrumbs";
import Caret from "../Icons/Caret";
import { useStore } from "../../utils/contextStore";
const Navigation = () => {
  const [store, dispatch] = useStore();
  const stepHandler = step => {
    dispatch({
      type: "CHECKOUT_TAKE_A_STEP",
      step
    });
  };

  return (
    <$.Wrapper>
      <$.BreadCrumb>
        <Link href="/cart">
          <a>Cart</a>
        </Link>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={store.checkout.step === "information"}>
        <button onClick={() => stepHandler("information")}>Information</button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={store.checkout.step === "shipping"}>
        <button
          onClick={() => stepHandler("shipping")}
          disabled={store.checkout.stepsLocked["shipping"]}
        >
          Shipping
        </button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={store.checkout.step === "payment"}>
        <button
          onClick={() => stepHandler("payment")}
          disabled={store.checkout.stepsLocked["payment"]}
        >
          Payment
        </button>
      </$.BreadCrumb>
    </$.Wrapper>
  );
};

export default Navigation;
