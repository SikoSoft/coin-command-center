import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../store/";
import './Ticker.scss';

function Ticker() {
  const [ state, dispatch ] = useContext(StoreContext);
  const [ tickerTimeout, setTickerTimeout ] = useState(null);
  const [ changeClass, setChangeClass ] = useState(null);
  const [ lastPrice, setLastPrice ] = useState({});
  const [ primary, setPrimary ] = useState(null);
  const [ secondary ] = useState('usd');
  const [ alternateTimeout, setAlternateTimeout ] = useState(null);

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
          dispatch({ type: "SET_TICKER_PRICES", payload: { tickerPrices: response.data } });
          if (!primary) {
            dispatch({ type: "SET_TICKER_FOR_ALTERNATE", payload: { shouldAlternate: true } });
          }
          setTickerTimeout(setTimeout(() => {
            dispatch({ type: "SET_TICKER_FOR_UPDATE" });
          }, state.config.ticker_price_frequency));
        }
      });
    }
  };

  const getNextPrimary = () => {
    const coins = Object.keys(state.tickerPrices);
    if (primary === '') {
      return coins[0];
    } else {
      const indexOfCoin = coins.indexOf(primary);
      if (indexOfCoin+1 < coins.length) {
        return coins[indexOfCoin+1];
      } else {
        return coins[0];
      }
    }
  };

  const alternate = () => {
    const nextPrimary = getNextPrimary();
    setPrimary(nextPrimary);
    if (!nextPrimary) {
      return;
    }
    if (
        !state.tickerPrices
        || !nextPrimary
        || !secondary
        || !state.tickerPrices[nextPrimary]
        || !state.tickerPrices[nextPrimary][secondary]
      ) {
      return;
    }
    const price = state.tickerPrices[nextPrimary][secondary];
    dispatch({ type: "SET_COIN_VALUE", payload: {
      value: price
    } });
    if (lastPrice[nextPrimary]) {
      if (price > lastPrice[nextPrimary]) {
        setChangeClass("Ticker__price--up");
      } else {
        setChangeClass("Ticker__price--down");
      }
    }
    setTimeout(() => {
      setChangeClass("");
    }, 5000);
    setLastPrice({ ...lastPrice, [nextPrimary]: price });
    dispatch({ type: "SET_TICKER_FOR_ALTERNATE", payload: { shouldAlternate: false } });
    setAlternateTimeout(setTimeout(() => {
      dispatch({ type: "SET_TICKER_FOR_ALTERNATE", payload: { shouldAlternate: true } });
    }, state.config.ticker_alternate_frequency));
  };

  useEffect(() => {
    if (state.shouldUpdateTicker) {
      updatePrice();
    }
    if (state.shouldAlternateTicker) {
      alternate();
    }
  });


  return (
    <div className="Ticker" style={{backgroundImage: `url('img/${primary}.png')`}}>
      <div className="Ticker__price_container">
        <div className={`Ticker__price ${changeClass}`}>
          <span className="Ticker__symbol">{ state.symbol }</span>
          <span className="Ticker__value">{ state.value }</span>
        </div>
      </div>
    </div>
  );
}

export default Ticker;
