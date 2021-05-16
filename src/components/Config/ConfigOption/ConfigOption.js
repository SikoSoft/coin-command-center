import axios from "axios";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../../store/";
import './ConfigOption.scss';

function ConfigOption({ name }) {
  const [ state, dispatch ] = useContext(StoreContext);

  const [newValue, setNewValue] = useState(state.config[name]);

  const save = () => {
    axios.post(
        `${process.env.REACT_APP_API_BASE}/updateCryptoConfig`, {
          name: name,
          value: newValue
        }, {
          headers: {
            'x-functions-key': state.authToken
          }
        }
    ).then((response) => {
      dispatch({ type: "SET_CONFIG_OPTION", payload: { name, value: newValue } })
    });
  };

  const update = (e) => {
      setNewValue(e.target.value);
  }

  return (
    <div className={`ConfigOption ${state.config[name] !== newValue ? 'ConfigOption--unsaved' : ''}`}>
        <input className="ConfigOption__input" type="text" placeholder={name} defaultValue={state.config[name]} onChange={update}/>
        <button className="ConfigOption__save" type="button" onClick={save}>save</button>
    </div>
  );
}

export default ConfigOption;
