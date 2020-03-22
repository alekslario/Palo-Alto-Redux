// store.js
import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const defaultState = {
  cart: [],
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
