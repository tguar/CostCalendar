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
  border: 1px solid #000000;
  display: flex;
  flex-direction: column-reverse;
  height: 80%;
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

const Progress = styled.div`
  width: 100%;
  background-color: ${({ color }) => color};
  height: ${({ height }) => `${Math.ceil(height)}%`};
`;

const Day = props => {
  const { dayNumber, fill } = props;
  const keys = fill ? Object.keys(fill) : [];
  return (
    <DayWrapper>
      <Number dayNumber={dayNumber}>
        {keys.map((key, index) => (
          <Progress key={`.0${index}`} color={key} height={fill[key]} />
        ))}
      </Number>
    </DayWrapper>
  );
};

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
};

export default Day;
