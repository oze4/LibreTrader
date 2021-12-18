import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  date: "",
  symbol: "",
  newsCatalyst: "",
  summary: "",
  zone: {
    type: "",
    timeFrame: "",
    start: "",
    end: "",
    images: [],
    notes: "",
  },
  zones: [],
  newsAndCatalysts: [],
  errors: {},
};

const context = createContext(initialState);

const actions = {
  SET_STATE: "SET_STATE",
  CLEAR_FORM: "CLEAR_FORM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATE: {
      const newState = { ...state, ...action.value };
      console.log({ from: "SET_STATE", oldState: state, newState });
      return newState;
    }
    case actions.CLEAR_FORM: {
      return { ...initialState };
    }
    default:
      return;
  }
};

export function useTradePlanContext() {
  const { state, dispatch } = useContext(context);

  const setState = (newState) => {
    return dispatch({ type: actions.SET_STATE, value: newState });
  };

  const isError = (propName) => {
    return state.errors[propName] && state.errors[propName] !== "";
  };

  const removeFieldError = (field) => {
    const errs = { ...state.errors };
    if (isError(field)) {
      delete errs[field];
    }
    return errs;
  };

  const clearForm = () => {
    dispatch({ type: actions.CLEAR_FORM });
  };

  return {
    state,
    setState,
    isError,
    removeFieldError,
    clearForm,
  };
}

export function TradePlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
}
