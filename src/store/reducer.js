const Reducer = (state, action) => {
    //console.log("REDUCER", action);
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
                config: {
                    ...state.config,
                    ticker_primary: action.payload.ticker_primary,
                    ticker_secondary: action.payload.ticker_secondary,
                    ticker_price_frequency: action.payload.ticker_price_frequency,
                    ticker_config_frequency: action.payload.ticker_config_frequency
                },
                lastConfigTime: Date.now(),
                configIsFetching: false
            }
        case "SET_COIN_VALUE":
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