import React from 'react';

const Select = props => {
  return (
    <div className="input-field col s12">
      <select id="parent" value={props.value} onChange={props.onChange} name={props.name}>
        <option value="0">Root</option>
        {props.options.map(option => (<option key={option.name} value={option.id}>{option.name}</option>))}
      </select>
      <label htmlFor="parent">Select parent category</label>
    </div>
  );
};

export default Select;