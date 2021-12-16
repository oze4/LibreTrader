import React, { createContext, useMemo, useState, useContext, useReducer } from "react";

const initialState = {
  date: "",
  symbol: "",
  newsCatalyst: "",
  biggerPicture: "",
  zone: {
    type: "",
    timeFrame: "",
    start: "",
    end: "",
    images: [],
  },
  zones: [],
  newsAndCatalysts: [],
};

const context = createContext(initialState);

const actions = {
  SET_STATE: "SET_STATE",
  CLEAR_FORM: "CLEAR_FORM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.value };
    case actions.CLEAR_FORM:
      return { ...initialState };
    default:
      return;
  }
};

export function useTradePlanContext() {
  const { state, dispatch } = useContext(context);

  const setState = (newState) => {
    dispatch({ type: actions.SET_STATE, value: newState });
  };

  const clearForm = () => {
    console.log("in clear form");
    dispatch({ type: actions.CLEAR_FORM });
  };

  return {
    state,
    setState,
    clearForm,
  };
}

export function TradePlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
}
