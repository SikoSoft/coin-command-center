const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_TICKER_FETCHING":
            return {
                ...state,
                tickerIsFetching: true
            }
        case "SET_CONFIG_FETCHING":
            return {
                ...state,
                configIsFetching: true
            };
        case "SET_CONFIG":
            return {
                ...state,
                ticker_primary: action.payload.ticker_primary,
                ticker_secondary: action.payload.ticker_secondary,
                ticker_frequency: action.payload.ticker_frequency,
                lastConfigTime: Date.now(),
                configIsFetching: false
            }
        case "SET_COIN_VALUE":
            console.log(action);
            return {
                ...state,
                value: action.payload.value,
                lastTickerTime: Date.now(),
                tickerIsFetching: false
            };
        default:
            return state;
    }
};

export default Reducer;