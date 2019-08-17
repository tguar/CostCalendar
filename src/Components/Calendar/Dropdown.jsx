import React from 'react';
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
const defaultOption = options[0];

const Dropdown = ({ onChange }) => (
  <StyledReactDropdown options={options} onChange={onChange} value={defaultOption} />
);

export default Dropdown;
