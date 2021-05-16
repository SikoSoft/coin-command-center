import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../store/";
import './Debug.scss';

function Debug() {
  const [ state, dispatch ] = useContext(StoreContext);



  return (
    <div className="Debug">
      <div className="Debug__panel_container">
        DEBUG
        <button onClick={() => { dispatch({ type: 'SET_CONFIG_FOR_UPDATE' }) }}>update config</button>
      </div>
    </div>
  );
}

export default Debug;
