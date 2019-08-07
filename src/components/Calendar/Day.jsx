import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 calc(100% / 7);
  height: 50px;
  justify-content: center;
`;

const Number = styled.span`
  align-items: center;
  border: 1px solid #000000;
  display: flex;
  height: 80%;
  justify-content: center;
  width: 80%;
`;

const Day = props => {
  const { dayNumber } = props;
  return (
    <DayWrapper>
      <Number>{dayNumber}</Number>
    </DayWrapper>
  );
};

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
};

export default Day;
