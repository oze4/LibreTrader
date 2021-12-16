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
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.value };
    default:
      return;
  }
};

export function useTradePlanContext() {
  const { state, dispatch } = useContext(context);

  const setState = (newState) => {
    dispatch({ type: actions.SET_STATE, value: newState });
  };

  return [
    state,
    setState,
  ];
}

export function TradePlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TradePlanContext.Provider value={{ state, dispatch }}>{children}</TradePlanContext.Provider>
  );
}
