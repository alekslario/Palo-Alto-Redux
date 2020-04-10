import Link from "next/link";
import $ from "./_BreadCrumbs";
import Caret from "../Icons/Caret";
const Navigation = ({ step, stepHandler }) => {
  return (
    <$.Wrapper>
      <$.BreadCrumb>
        <Link href="/">
          <a>Cart</a>
        </Link>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={step === "information"}>
        <button onClick={() => stepHandler("information")}>Information</button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={step === "shipping"}>
        <button onClick={() => stepHandler("shipping")}>Shipping</button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={step === "payment"}>
        <button onClick={() => stepHandler("payment")}>Payment</button>
      </$.BreadCrumb>
    </$.Wrapper>
  );
};

export default Navigation;
