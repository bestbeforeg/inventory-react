import React from 'react';

const RadioButton = props => {
  return (
    <div className="col s12 m12">
      <div>Select type</div>
      {props.options.map(option => {
        return <p key={option.value}>
          <label>
            <input
              name={props.name}
              type="radio"
              onChange={props.onChange}
              defaultChecked={option.value === props.value}
              value={option.value}
            />
            <span>{option.displayValue}</span>
          </label>
        </p>
      })}
    </div>
  );
}

export default RadioButton;