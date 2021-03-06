import axios from "axios";
import React, { useEffect, useContext } from "react";
import { Context } from "../../store/";
import './Ticker.scss';

function Ticker() {
  const [ state, dispatch ] = useContext(Context);

  const updatePrice = () => {
    const timeDiff = Date.now()-state.lastTickerTime;
    if (!state.tickerIsFetching && timeDiff > state.ticker_frequency) {
      dispatch({ type: "SET_TICKER_FETCHING" });
      axios.get(
        'https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: state.ticker_primary,
            vs_currencies: state.ticker_secondary
          }
        }).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_COIN_VALUE", payload: {
            value: response.data[state.ticker_primary][state.ticker_secondary]
          } });
        }
      });
    }
  }

  useEffect(() => {
    updatePrice();
    setTimeout(updatePrice, state.ticker_frequency);
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
