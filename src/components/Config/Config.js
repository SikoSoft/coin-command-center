import React, { useContext } from "react";
import ConfigOption from "./ConfigOption/ConfigOption.js";
import './Config.scss';

function Config() {

  const fields = ['ticker_primary', 'ticker_secondary', 'ticker_frequency'];

  return (
    <div className="Config">
      <div className="Config__fields_container">
        {fields.map((field) => {
            return (
                <ConfigOption key={field} name={field} />
            );
        })}
      </div>
    </div>
  );
}

export default Config;
