import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../../../store/";
import './ConfigOption.scss';

function ConfigOption({ name }) {
  const [ state, dispatch ] = useContext(Context);

  let newValue = state[name];

  const save = () => {
    console.log('save', name, newValue);
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
            <input className="Config__option_input" type="text" placeholder={name} defaultValue={state[name]} onChange={update}/>
            <button className="Config__option_save" type="button" onClick={save}>save</button>
        </div>
      </div>
    </div>
  );
}

export default ConfigOption;
