import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 calc(100% / 7);
  height: 75px;
  justify-content: center;
`;

const Number = styled.div`
  align-items: center;
  border: 1px solid #000000;
  display: flex;
  height: 80%;
  justify-content: center;
  position: relative;
  width: 80%;

  &:after {
    align-items: center;
    content: "${({ dayNumber }) => dayNumber}";
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
`;

const Day = props => {
  const { dayNumber } = props;
  return (
    <DayWrapper>
      <Number dayNumber={dayNumber} />
    </DayWrapper>
  );
};

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
};

export default Day;
