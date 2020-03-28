// store.js
import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const defaultState = {
  cart: [],
  cache: {},
  menuOpen: false,
  product: {},
  blogPost: {},
  filter: {
    men: {
      Jacket: false,
      "Long Sleeve": false,
      Plaid: false,
      "T-Shirt": false,
      Wool: false
    },
    women: {
      Hat: false,
      "Long Sleeve": false,
      Shorts: false,
      "T-Shirt": false,
      Womens: false
    }
  }
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
              contentId: [product.contentId],
              quantity:
                (state.cart[product.productId]?.quantity || 0) +
                product.quantity
            };
            return acc;
          }, {})
        }
      };
    case "INCREMENT_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.productId]: {
            ...state.cart[action.productId],
            quantity: state.cart[action.productId].quantity + 1
          }
        }
      };
    case "DECREMENT_CART":
      if (state.cart[action.productId].quantity === 1) {
        delete state.cart[action.productId];
        return { ...state };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.productId]: {
            ...state.cart[action.productId],
            quantity: state.cart[action.productId].quantity - 1
          }
        }
      };
    case "REMOVE_FROM_CART":
      delete state.cart[action.productId];
      return {
        ...state
      };
    case "ADD_TO_PRODUCT_CACHE":
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.products.reduce((acc, ele) => {
            acc[ele.sys.id] = ele;
            return acc;
          }, {})
        }
      };
    case "ADD_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.gender]: {
            ...state.filter[action.gender],
            [action.filter]: !state.filter[action.gender][action.filter]
          }
        }
      };
    case "RESET_FILTER":
      return { ...state, filter: defaultState.filter };
    case "ADD_PRODUCT":
      return { ...state, product: action.product };
    case "ADD_BLOG_POST":
      return { ...state, blogPost: action.blogPost };
    case "OPEN_MENU":
      return { ...state, menuOpen: true };
    case "CLOSE_MENU":
      return { ...state, menuOpen: false };
    case "TOGGLE_MENU":
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
