import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Month from './Month';
import Days from './Days';

const Wrapper = styled.div`
  border: 1px solid #000000;
  margin-bottom: 3rem;
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
