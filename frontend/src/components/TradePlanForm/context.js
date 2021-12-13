import { createContext, useMemo, useState } from "react";

const defaultState = {
  current: {
    date: "",
    symbol: "",
    newsCatalyst: "",
    zone: {
      type: "",
      timeFrame: "",
      start: "",
      end: "",
      images: [],
    }
  },
  state: {
    biggerPicture: "",
    date: Date.now(),
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
    return newCurrent
  }
};

export const TradePlanContext = createContext(defaultState);

export function TradePlanProvider({ children }) {
  const [planState, setPlanState] = useState(defaultState);

  const finalState = useMemo(() => {
    return {
      state: { ...state },
      current: { ...JSON.stringify(current) },
      setState: (newState) => {
        setPlanState({
          ...planState,
          state: { ...newState },
        });
      },
      setCurrent: (newCurrent) => {
        setPlanState({
          ...planState,
          current: { ...newCurrent }
        })
      }
    };
  }, [state]);

  return <TradePlanContext.Provider value={finalState}>{children}</TradePlanContext.Provider>;
}
