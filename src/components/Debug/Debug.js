import React, { useContext } from "react";
import { StoreContext } from "../../store/";
import './Debug.scss';

function Debug() {
  const [ state, dispatch ] = useContext(StoreContext);

  const updateConfig = () => {
    dispatch({ type: 'SET_CONFIG_FOR_UPDATE' });
  };

  const updateTicker = () => {
    dispatch({ type: 'SET_TICKER_FOR_UPDATE' });
  };

  return (
    <div className="Debug">
      <div className="Debug__panel_container">
        <button className="Debug__button" onClick={updateConfig}>
          update config
        </button>
        <button className="Debug__button" onClick={updateTicker}>
          update ticker
        </button>
      </div>
    </div>
  );
}

export default Debug;
