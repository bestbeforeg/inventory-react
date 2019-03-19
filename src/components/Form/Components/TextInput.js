import React from 'react';
import "../styles/Form.css";


const TextInput = (props) => {
  return (
    <div className="input-field col s12 m12">
      <input
        type="text"
        name={props.name}
        id={props.id}
        className={"validate" + (!props.valid ? " not-valid" : "")}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>Name</label>
      {!props.valid && <span className="helper-text">{props.error}</span>}
    </div>
  );
};

export default TextInput;
