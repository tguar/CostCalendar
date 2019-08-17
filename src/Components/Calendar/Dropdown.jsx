import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const StyledReactDropdown = styled(ReactDropdown)`
  .Dropdown-control { 
    align-items: center;
    display: flex;
    height: calc(1.5em + 0.75rem + 2px);
    width: 170px;
  }

`;

const options = [
  { value: 0, label: 'hourly' },
  { value: 1, label: 'daily' },
  { value: 2, label: 'weekly' },
  { value: 3, label: 'bi-weekly' },
  { value: 4, label: 'semi-monthly' },
  { value: 5, label: 'monthly' },
];

const Dropdown = ({ onChange }) => {
  const [value, setValue] = useState(options[0].label);

  const handleOnChange = (e) => {
    setValue(e.label);
    onChange(e);
  };
  return (
    <StyledReactDropdown options={options} onChange={handleOnChange} value={value} />
  );
};

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
