import Link from "next/link";
import $ from "./_Navigation";

const Caret = () => (
  <svg viewBox="0 0 10 10">
    <path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path>
  </svg>
);
const Navigation = ({ active, stepHandler }) => {
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
      <$.BreadCrumb isActive={active === "information"}>
        <button onClick={() => stepHandler("information")}>Information</button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={active === "shipping"}>
        <button onClick={() => stepHandler("shipping")}>Shipping</button>
      </$.BreadCrumb>
      <$.BreadCrumb>
        <span>
          <Caret />
        </span>
      </$.BreadCrumb>
      <$.BreadCrumb isActive={active === "payment"}>
        <button onClick={() => stepHandler("payment")}>Payment</button>
      </$.BreadCrumb>
    </$.Wrapper>
  );
};

export default Navigation;
