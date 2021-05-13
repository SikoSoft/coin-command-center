import React, { useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import axios from 'axios';
import Ticker from "../Ticker/Ticker.js"
import Config from "../Config/Config.js"
import { Context } from "../../store/";
import './CommandCenter.scss';

function App() {

  const [ state, dispatch ] = useContext(Context);

  const getConfig = () => {
    const timeDiff = Date.now()-state.lastConfigTime;
    if (!state.configIsFetching && timeDiff > state.config.ticker_config_frequency) {
        dispatch({ type: "SET_CONFIG_FETCHING" });
        axios.get(`${process.env.REACT_APP_API_BASE}/getCryptoConfig`).then((response) => {
            if (response.status === 200) {
                dispatch({ type: "SET_CONFIG", payload: response.data });
            }
        });
    }
  };

  useEffect(() => {
   getConfig();
   setTimeout(getConfig, state.config.ticker_config_frequency);
  });

  return (
      <Router>
        <div className="CommandCenter">
            <Route path="/ticker">
                {state.lastConfigTime > 0 && <Ticker />}
            </Route>
            <Route path="/config">
                {state.lastConfigTime > 0 && <Config />}
            </Route>
        </div>
      </Router>
  );
}

export default App;
