import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../store/";
import './Ticker.scss';

function Ticker() {
  const [ state, dispatch ] = useContext(StoreContext);
  const [ tickerTimeout, setTickerTimeout ] = useState(null);

  const updatePrice = async () => {
    if (!state.tickerIsFetching) {
      dispatch({ type: "SET_TICKER_FETCHING" });
      if (tickerTimeout) {
        clearTimeout(tickerTimeout);
      }
      axios.get(
        'https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: state.config.ticker_primary,
            vs_currencies: state.config.ticker_secondary
          }
        }).then(async (response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_COIN_VALUE", payload: {
            value: response.data[state.config.ticker_primary][state.config.ticker_secondary]
          } });
          setTickerTimeout(setTimeout(() => {
            dispatch({ type: "SET_TICKER_FOR_UPDATE" });
          }, state.config.ticker_price_frequency));
        }
      });
    }

  };

  useEffect(() => {
    if (state.shouldUpdateTicker) {
      updatePrice();
    }
  });


  return (
    <div className="Ticker">
      <div className="Ticker__price_container">
        <div className="Ticker__price">
          <span className="Ticker__symbol">{ state.symbol }</span>
          <span className="Ticker__value">{ state.value }</span>
        </div>
      </div>
    </div>
  );
}

export default Ticker;
