import axios from "axios";
import React, { useEffect, useContext } from "react";
import { Context } from "../../store/";
import './Ticker.scss';

function Ticker() {
  const [ state, dispatch ] = useContext(Context);

  const updatePrice = () => {
    //console.log("updatePrice", state.config);
    const timeDiff = Date.now()-state.lastTickerTime;
    if (!state.tickerIsFetching && timeDiff > state.config.ticker_price_frequency) {
      dispatch({ type: "SET_TICKER_FETCHING" });
      //console.log("making COINGECKO request...", state.config.ticker_primary);
      axios.get(
        'https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: state.config.ticker_primary,
            vs_currencies: state.config.ticker_secondary
          }
        }).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_COIN_VALUE", payload: {
            value: response.data[state.config.ticker_primary][state.config.ticker_secondary]
          } });
          setTimeout(updatePrice, state.config.ticker_price_frequency);
        }
      });
    }
  }

  useEffect(() => {
    updatePrice();
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
