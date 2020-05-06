import React, { useEffect } from "react";
import $ from "./_Shipping";
import formatMoney from "../../utils/formatMoney";
import { css } from "styled-components";
import RadioPick from "./Radio";
import Table from "./Table";
import Navigation from "./Navigation";
import { useStore } from "../../utils/contextStore";
const Shipping = () => {
  const [store, dispatch] = useStore();
  const shippingFares =
    store.checkout.shipping[store.checkout.details.country.value] ||
    store.checkout.shipping["International"] ||
    [];
  useEffect(() => {
    if (store.checkout.selectedShipping?.name) return;
    dispatch({
      type: "CHECKOUT_SELECTED_SHIPPING",
      shipping: shippingFares[0],
    });
  }, []);
  return (
    <>
      <$.Wrapper>
        <Table details={store.checkout.details} />
        <$.Shipping>
          <$.H2>Shipping method</$.H2>
          <$.Table>
            {shippingFares.map(({ name, price, time }, index) => (
              <label htmlFor={name.slice(0, 2) + index} key={index}>
                <$.Row
                  css={`
                    justify-content: space-between;
                    padding: 1.14286em;
                    cursor: pointer;
                    ${index > 0
                      ? css`
                          border-top: 1px solid
                            ${({ theme }) => theme.checkout.sideColors.border};
                        `
                      : ""}
                  `}
                >
                  <$.Row>
                    <RadioPick
                      id={name.slice(0, 2) + index}
                      name="radio-shipping"
                      checked={name === store.checkout.selectedShipping?.name}
                      onChange={() => {
                        if (name !== store.checkout.selectedShipping?.name) {
                          dispatch({
                            type: "CHECKOUT_SELECTED_SHIPPING",
                            shipping: { name, price, time },
                          });
                        }
                      }}
                    />
                    <$.Column>
                      <label
                        htmlFor={name.slice(0, 2) + index}
                        css={`
                          color: ${({ theme }) =>
                            theme.checkout.colors.subText};
                        `}
                      >
                        {name}
                      </label>
                      <span
                        css={`
                          font-size: 0.85714em;
                          color: ${({ theme }) =>
                            theme.checkout.colors.smallText};
                        `}
                      >
                        {time}
                      </span>
                    </$.Column>
                  </$.Row>
                  <span
                    css={`
                      font-weight: 500;
                      padding-left: 0.75em;
                      white-space: nowrap;
                    `}
                  >
                    {formatMoney(price)}
                  </span>
                </$.Row>
              </label>
            ))}
          </$.Table>
        </$.Shipping>
      </$.Wrapper>
      <Navigation />
    </>
  );
};

export default Shipping;
