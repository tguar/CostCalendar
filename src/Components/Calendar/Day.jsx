import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 calc(100% / 7);
  height: 90px;
  justify-content: center;
`;

const Number = styled.div`
  background-color: ${({ isDisabled }) =>
    isDisabled ? '#dddddd' : 'transparent'};
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: ${({ dayNumber }) => (dayNumber ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column-reverse;
  height: 90%;
  position: relative;
  width: 90%;

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
  const { dayNumber, fill, isDisabled, ...restProps } = props;
  const keys = fill ? Object.keys(fill) : [];

  return (
    <DayWrapper>
      <Number
        dayNumber={dayNumber}
        isDisabled={isDisabled}
        role="button"
        tabIndex={dayNumber ? '0' : ''}
        {...restProps}
      >
        {keys.map((key, index) => (
          <Progress key={`.0${index}`} color={key} height={fill[key]} />
        ))}
      </Number>
    </DayWrapper>
  );
};

Day.propTypes = {
  dayNumber: PropTypes.number,
};

export default Day;
