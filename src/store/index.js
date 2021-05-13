import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
    primaryCurrency: 'dogecoin',
    secondaryCurrency: 'usd',
    value: 0,
    symbol: '$',
    lastConfigTime: 0,
    lastTickerTime: 0,
    tickerFrequency: 60000,
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