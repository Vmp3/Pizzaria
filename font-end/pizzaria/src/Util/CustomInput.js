// CustomInput.js
import React from 'react';
import './CustomStyles.css';

const CustomInput = (props) => {
  const { type, placeholder, value, onChange, required, backgroundColor, styleType } = props;

  const inputClassName = `custom-input ${styleType}`;

  const inputStyle = {
    backgroundColor: backgroundColor || 'white',
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClassName}
      style={inputStyle}
      required={required}
    />
  );
};

export default CustomInput;
