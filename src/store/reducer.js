const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_TICKER_FETCHING":
            return {
                ...state,
                tickerIsFetching: true,
                shouldUpdateTicker: false,
            }
        case "SET_CONFIG_FETCHING":
            return {
                ...state,
                configIsFetching: true,
                shouldUpdateConfig: false
            };
        case "SET_TICKER_FOR_UPDATE":
            return {
                ...state,
                shouldUpdateTicker: true
            };
        case "SET_CONFIG_FOR_UPDATE":
            return {
                ...state,
                shouldUpdateConfig: true
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
        case "SET_CONFIG_OPTION":
            return {
                ...state,
                config: {
                    ...state.config,
                    [action.payload.name]: action.payload.value 
                }
            };
        case "SET_COIN_VALUE":
            return {
                ...state,
                value: action.payload.value,
                lastTickerTime: Date.now(),
                tickerIsFetching: false
            };
        case "SET_AUTH_TOKEN":
            return {
                ...state,
                authToken: action.payload.authToken
            };
        default:
            return state;
    }
};

export default Reducer;