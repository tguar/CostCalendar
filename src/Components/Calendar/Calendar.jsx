import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Month from './Month';
import Days from './Days';

const Wrapper = styled.div`
  border: 1px solid #cccccc;
  margin-bottom: 3rem;
  border-radius: 5px;
  padding: 0 5px 5px 5px;

  @media only screen and (max-width: 768px)
  {
    border: none;
  }
`;

const Calendar = () => {
  return (
    <Wrapper>
      <Month />
      <Days />
    </Wrapper>
  );
};

export default Calendar;
