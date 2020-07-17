// store.js
import React, { createContext, useContext, useReducer } from "react";
import cookie from "js-cookie";
import { handleLogout } from "../utils/auth";
import { updateCartStorage, removeFromCartStorage } from "./updateCartStorage";
const StoreContext = createContext();

const applyMiddleware = (dispatch, getState) => (action) => {
  switch (action.type) {
    case "UPDATE_CART_PRODUCT":
      updateCartStorage({ ...action });
      break;
    case "REMOVE_FROM_CART":
      removeFromCartStorage({ ...action });
      break;
    case "LOGOUT_WITHOUT_REDIRECT":
      cookie.remove("token");
      break;
    case "LOGOUT":
      handleLogout();
      break;
    case "WIPE_CHECKOUT":
      window.localStorage.removeItem("cart");
      break;
  }
  dispatch(action);
};

const defaultCheckout = {
  step: "information",
  stepsLocked: { information: false, payment: true, shipping: true },
  fetchingIntent: false,
  paymentMethod: null,
  details: {
    email: { value: "", error: "" },
    name: { value: "", error: "" },
    surname: { value: "", error: "" },
    address: { value: "", error: "" },
    addressOptional: { value: "", error: "" },
    city: { value: "", error: "" },
    country: { value: "US", error: "" },
    postcode: { value: "", error: "" },
  },
  saveShipping: false,
  saveEmail: false,
  savePaymentMethod: false,
  shipping: [],
  selectedShipping: {},
  clientSecret: "",
};
const defaultState = {
  orders: [],
  ordersCache: {},
  totalOrderNumber: 0,
  cart: {},
  cache: {},
  menuOpen: false,
  activeModal: null,
  cartOpen: false,
  filter: {
    men: {
      Jacket: false,
      "Long Sleeve": false,
      Plaid: false,
      "T-Shirt": false,
      Wool: false,
    },
    women: {
      Hat: false,
      "Long Sleeve": false,
      Shorts: false,
      "T-Shirt": false,
      Womens: false,
    },
  },
  user: null,
  checkout: defaultCheckout,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELIVER_CART":
      return {
        ...state,
        cart: Array.isArray(action.items)
          ? action.items.reduce(
              (acc, { productId, quantity, contentId }) => (
                (acc[productId] = { quantity, contentId }), acc
              ),
              {}
            )
          : action.items,
        ...(action.user ? { user: action.user } : {}),
      };

    case "UPDATE_CART_PRODUCT":
      if (
        state.cart[action.productId] &&
        state.cart[action.productId].quantity + action.modifier === 0
      ) {
        delete state.cart[action.productId];
        return { ...state, cart: { ...state.cart } };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.productId]: {
            contentId: action.contentId,
            quantity:
              (state.cart[action.productId]?.quantity || 0) + action.modifier,
          },
        },
      };
    case "REMOVE_FROM_CART":
      delete state.cart[action.productId];

      return {
        ...state,
        cart: { ...state.cart },
      };
    case "ADD_TO_CACHE":
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.items.reduce((acc, ele) => {
            acc[ele.sys.id] = ele;
            return acc;
          }, {}),
          ...(action.cacheName ? { [action.cacheName]: action.items } : {}),
        },
      };
    case "ADD_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.gender]: {
            ...state.filter[action.gender],
            [action.filter]: !state.filter[action.gender][action.filter],
          },
        },
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          address: action.address,
        },
      };
    case "RESET_FILTER":
      return { ...state, filter: defaultState.filter };
    case "SET_ACTIVE_MODAL":
      return { ...state, activeModal: action.id };
    case "OPEN_CART":
      return { ...state, cartOpen: true, menuOpen: false };
    case "CLOSE_SIDEBAR":
      return { ...state, cartOpen: false, menuOpen: false };
    case "CLOSE_CART":
      return { ...state, cartOpen: false };

    case "OPEN_MENU":
      return { ...state, menuOpen: true, cartOpen: false };
    case "CLOSE_MENU":
      return { ...state, menuOpen: false };
    case "SET_FETCHING_INTENT":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          fetchingIntent: true,
        },
      };
    case "ADD_CHECKOUT_PAYMENT_METHOD":
      return {
        ...state,
        checkout: { ...state.checkout, paymentMethod: action.paymentMethod },
      };
    case "CHECKOUT_TAKE_A_STEP":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          step: action.step,
          stepsLocked: { ...state.checkout.stepsLocked, [action.step]: false },
        },
      };
    case "CHECKOUT_SET_ERRORS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          details: {
            ...state.checkout.details,
            ...action.errors.reduce((acc, el) => {
              acc[el.name].error = el.error;
              return acc;
            }, state.checkout.details),
          },
        },
      };
    case "CHECKOUT_SHIPPING_ADDRESS_CHANGE":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          details: {
            ...state.checkout.details,
            ...action.changes.reduce(
              (acc, { name, value }) => (
                (acc[name] = { value, error: "" }), acc
              ),
              {}
            ),
          },
          selectedShipping: {},
          stepsLocked: { information: false, payment: true, shipping: true },
        },
      };
    case "UPDATE_CLIENT_SECRET":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          clientSecret: action.clientSecret,
          fetchingIntent: false,
        },
      };
    case "CHECKOUT_ADD_SHIPPING_FARES":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          shipping: action.shipping,
        },
      };
    case "CHECKOUT_SELECTED_SHIPPING":
      return {
        ...state,
        checkout: { ...state.checkout, selectedShipping: action.shipping },
      };

    case "WIPE_CHECKOUT":
      return {
        ...state,
        user: action.user || null,
        cart: action.cart || {},
        checkout: defaultCheckout,
      };
    case "TOGGLE_SAVE_SHIPPING":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          saveShipping: !state.checkout.saveShipping,
        },
      };
    case "TOGGLE_SAVE_EMAIL":
      return {
        ...state,
        checkout: { ...state.checkout, saveEmail: !state.checkout.saveEmail },
      };
    case "TOGGLE_SAVE_PAYMENT_METHOD":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          savePaymentMethod: !state.checkout.savePaymentMethod,
        },
      };
    case "LOGOUT_WITHOUT_REDIRECT":
      return {
        ...state,
        cart: {},
        orders: [],
        ordersCache: {},
        totalOrderNumber: 0,
        user: null,
        checkout: defaultCheckout,
      };
    case "LOGOUT":
      return {
        ...state,
        cart: {},
        orders: [],
        ordersCache: {},
        totalOrderNumber: 0,
        user: null,
        checkout: defaultCheckout,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        ...(action.cart
          ? Array.isArray(action.cart)
            ? action.cart.reduce(
                (acc, { productId, quantity, contentId }) => (
                  (acc[productId] = { quantity, contentId }), acc
                ),
                {}
              )
            : { cart: action.cart }
          : {}),
        ...(action.orders ? { orders: action.orders } : {}),
        ...(action.totalOrderNumber
          ? { totalOrderNumber: action.totalOrderNumber }
          : {}),
        ...(typeof action.skip !== "undefined" && action.orders
          ? {
              ordersCache: {
                ...state.ordersCache,
                [action.skip]: action.orders,
              },
            }
          : {}),
      };
    case "SET_ORDERS":
      return {
        ...state,
        ...(typeof action.skip !== "undefined"
          ? {
              ordersCache: {
                ...state.ordersCache,
                [action.skip]: action.orders,
              },
            }
          : {}),
        orders: action.orders,
        ...(action.totalOrderNumber
          ? { totalOrderNumber: action.totalOrderNumber }
          : {}),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const getState = () => state;

  const enhancedDispatch = applyMiddleware(dispatch, getState);

  return (
    <StoreContext.Provider value={[state, enhancedDispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
