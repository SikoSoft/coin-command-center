import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
    config: {
        ticker_primary: 'dogecoin',
        ticker_secondary: 'usd',
        ticker_price_frequency: 60000,
        ticker_config_frequency: 60000,
    },
    value: 0,
    symbol: '$',
    lastConfigTime: 0,
    lastTickerTime: 0,
    tickerIsFetching: false,
    configIsFetching: false,
    history: {}
}

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;