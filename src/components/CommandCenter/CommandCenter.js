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

function CommandCenter() {

  const [ state, dispatch ] = useContext(Context);

  const getConfig = () => {
    const {lastConfigTime, config, configIsFetching} = state;
    const timeDiff = Date.now()-lastConfigTime;
    //console.log("getConfig", configIsFetching, timeDiff, config.ticker_config_frequency);
    if (!configIsFetching && timeDiff > config.ticker_config_frequency) {
        //console.log('proceed with request');
        dispatch({ type: "SET_CONFIG_FETCHING" });
        axios.get(`${process.env.REACT_APP_API_BASE}/getCryptoConfig`).then((response) => {
            if (response.status === 200) {
                dispatch({ type: "SET_CONFIG", payload: response.data });
                setTimeout(getConfig, state.config.ticker_config_frequency);
            }
        });
    }
  };

  useEffect(() => {
    //console.log('useEffect');
    getConfig();
  });

  return (
      <Router>
        <div className="CommandCenter">
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
