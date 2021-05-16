import React, { useEffect, useContext, useState } from "react";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";
import axios from 'axios';
import Ticker from "../Ticker/Ticker.js"
import Config from "../Config/Config.js"
import Debug from "../Debug/Debug.js";
import { StoreContext } from "../../store/";
import './CommandCenter.scss';

function CommandCenter() {

  const [ state, dispatch ] = useContext(StoreContext);
  const [ configTimeout, setConfigTimeout ] = useState(null);


  const getConfig = () => {
    if (!state.configIsFetching) {
        dispatch({ type: "SET_CONFIG_FETCHING" });
        if (configTimeout) {
          clearTimeout(configTimeout);
        }
        axios.get(`${process.env.REACT_APP_API_BASE}/getCryptoConfig`).then((response) => {
            if (response.status === 200) {
                dispatch({ type: "SET_CONFIG", payload: response.data });
                setConfigTimeout(setTimeout(() => {
                  dispatch({ type: "SET_CONFIG_FOR_UPDATE" });
                }, state.config.ticker_config_frequency));
            }
        });
    }
  };

  useEffect(() => {
    if (state.shouldUpdateConfig) {
      getConfig();
    }
  });

  return (
      <Router>
        <div className="CommandCenter">
            <Debug />
            <Route path={process.env.REACT_APP_BASE_PATH+'/ticker'}>
                {state.lastConfigTime > 0 && <Ticker />}
            </Route>
            <Route path={process.env.REACT_APP_BASE_PATH+'/config'}>
                {state.lastConfigTime > 0 && <Config />}
            </Route>
        </div>
      </Router>
  );
}

export default CommandCenter;
