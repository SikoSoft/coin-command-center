import React from "react";
import Reducer from "./reducer";

const initialState = {
    config: {
        ticker_primary: 'dogecoin',
        ticker_secondary: 'usd',
        ticker_price_frequency: 60000,
        ticker_config_frequency: 60000,
        ticker_alternate_frequency: 10000
    },
    tickerPrimaryActive: '',
    tickerSecondaryActive: 'usd',
    tickerPrices: null,
    value: 0,
    symbol: '$',
    lastConfigTime: 0,
    lastTickerTime: 0,
    tickerIsFetching: false,
    configIsFetching: false,
    shouldUpdateTicker: true,
    shouldUpdateConfig: true,
    shouldAlternateTicker: false,
    history: {},
    authToken: ''
}

export const StoreContext = React.createContext(initialState);

const Store = ({ children }) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
};

export default Store;