import React, { createContext, useContext, useReducer } from "react";

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
    notes: "",
  },
  zones: [],
  newsAndCatalysts: [],
  errors: {},
};

const context = createContext(initialState);

const actions = {
  SET_STATE: "SET_STATE",
  SET_ERRORS: "SET_ERRORS",
  CLEAR_FORM: "CLEAR_FORM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.value };
    case actions.SET_ERRORS:
        return { ...state, errors: { ...action.value } };
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

  const setErrors = ({ ...errors }) => {
    dispatch({ type: actions.SET_ERRORS, value: errors });
  }

  const isError = (propName) => {
    return state.errors[propName] && state.errors[propName] !== "";
  }

  const clearForm = () => {
    dispatch({ type: actions.CLEAR_FORM });
  };

  return {
    state,
    setState,
    setErrors,
    isError,
    clearForm,
  };
}

export function TradePlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
}
