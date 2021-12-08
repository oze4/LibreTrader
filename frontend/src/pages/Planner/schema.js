/**
 * 
 * This file should not be used.
 * This was done for prototyping purposes.
 * 
 */

export default {
  // Todays date
  date: Date.now(),
  // /ES, /NQ, QQQ, SPY, TSLA, etc.. meant for any valid symbol, although we do not validate input for this field.
  symbol: "",
  // Array of TrandPlan
  tradePlans: [{
    // Any news or possible catalyst. Why is this in your trading plan?
    newsAndCatalysts: [],
    // Notes on this plan. "Market picture" relative to this symbol.
    biggerPicture: "", 
    zones: {
      supply: [{ 
        timeframe: "", // (1min,5min,10min, etc...) 
        startPrice: "", // start of supply zone 
        endPrice: "", // end of supply zone
        screenshots: [], // array of screenshots for this zone.
      }],
      demand: [{
        timeframe: "", // (1min,5min,10min, etc...) 
        startPrice: "", // start of demand zone 
        endPrice: "", // end of demand zone
        screenshots: [], // array of screenshots for this zone.
      }],
    }
  }],
}