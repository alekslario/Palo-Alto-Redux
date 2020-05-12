// store.js
import React, { createContext, useContext, useReducer } from "react";
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
  }
  dispatch(action);
};

const defaultState = {
  cart: {},
  cache: {},
  menuOpen: false,
  product: {},
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
  user: {},
  checkout: {
    step: "information",
    stepsLocked: { information: false, payment: true, shipping: true },
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
    shipping: [],
    selectedShipping: {},
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          ...action.items.reduce((acc, product) => {
            acc[product.productId] = {
              contentId: product.contentId,
              quantity:
                (state.cart[product.productId]?.quantity || 0) +
                product.quantity,
            };
            return acc;
          }, {}),
        },
        user: action.user,
      };

    case "UPDATE_CART_PRODUCT":
      if (
        state.cart[action.productId] &&
        state.cart[action.productId].quantity + action.modifier === 0
      ) {
        delete state.cart[action.productId];
        return { ...state };
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
    case "RESET_FILTER":
      return { ...state, filter: defaultState.filter };
    case "ADD_PRODUCT":
      return { ...state, product: action.product };
    case "OPEN_MENU":
      return { ...state, menuOpen: true };
    case "CLOSE_MENU":
      return { ...state, menuOpen: false };
    case "TOGGLE_MENU":
      return { ...state, menuOpen: !state.menuOpen };
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
            [action.name]: { value: action.value, error: "" },
          },
          selectedShipping: {},
          stepsLocked: { information: false, payment: true, shipping: true },
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
