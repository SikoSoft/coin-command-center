import axios from "axios";
import React, { useContext } from "react";
import { StoreContext } from "../../../store/";
import './ConfigOption.scss';

function ConfigOption({ name }) {
  const [ state ] = useContext(StoreContext);

  let newValue = state[name];

  const save = () => {
    axios.post(
        `${process.env.REACT_APP_API_BASE}/updateCryptoConfig`, {
            name: name,
            value: newValue
        }
    ).then((response) => {

    });
  };

  const update = (e) => {
      newValue = e.target.value;
  }

  return (
    <div className="Config">
      <div className="Config__fields_container">
        <div className="Config__option">
            <input className="Config__option_input" type="text" placeholder={name} defaultValue={state.config[name]} onChange={update}/>
            <button className="Config__option_save" type="button" onClick={save}>save</button>
        </div>
      </div>
    </div>
  );
}

export default ConfigOption;
