import React, { useState } from "react";

export const useFormState = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const handleSetState = (e) => {
    const [name, value] = [e.target.name, e.target.value];
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  return [state, handleSetState];
};

export const useFormStateBoolean = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const handleSetState = (e) => {
    const name = e.target.name;
    setState((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };
  return [state, handleSetState];
};
