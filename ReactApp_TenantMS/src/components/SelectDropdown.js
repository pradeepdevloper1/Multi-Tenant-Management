import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ options, onChange, placeholder }) => {
  return <Select options={options} onChange={onChange} placeholder={placeholder} />;
};

export default SelectDropdown;