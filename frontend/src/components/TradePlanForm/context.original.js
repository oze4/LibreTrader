import React, { createContext, useMemo, useState } from "react";

export const tradePlanFormActions = {
  SET_STATE: "SET_STATE",
  // INCREMENT: "INCREMENT",
  // DECREMENT: "DECREMENT",
};

export const tradePlanFormReducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.value };
    // case "increment":
    //     return { ...state, count: state.count + 1 };
    // case "decrement":
    //     return { ...state, count: state.count - 1 };
    default:
      return;
  }
};

const defaultState = {
  current: {
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
  },
  state: {
    biggerPicture: "",
    date: "", // Date.now(),
    symbol: "",
    // a zone has the following shape:
    //// { type: ("supply"|"demand"), timeFrame: String, start: String, end: String, images: [String] }
    zones: [],
    newsAndCatalysts: [],
  },
  setState: (newState) => {
    return newState;
  },
  setCurrent: (newCurrent) => {
    return newCurrent;
  },
  clearFormData: () => {},
};

export const TradePlanContext = createContext(defaultState);

export function TradePlanProvider({ children }) {
  const [planState, setPlanState] = useState(defaultState);

  const finalState = useMemo(() => {
    return {
      state: { ...planState.state },
      current: { ...planState.current },
      setState: (newState) => {
        setPlanState({
          ...planState,
          state: { ...newState },
        });
      },
      setCurrent: (newCurrent) => {
        setPlanState({
          ...planState,
          current: { ...newCurrent },
        });
      },
      clearFormData: () => {
        setPlanState({
          ...planState,
          state: {
            date: "",
            symbol: "",
            newsAndCatalysts: [],
            biggerPicture: "",
            zones: [],
          },
          current: {
            date: "",
            symbol: "",
            newsAndCatalysts: "",
            biggerPicture: "",
            zone: {
              type: "",
              timeFrame: "",
              start: "",
              end: "",
              images: [],
            },
          },
        });
      },
    };
  }, [planState]);

  return <TradePlanContext.Provider value={finalState}>{children}</TradePlanContext.Provider>;
}
