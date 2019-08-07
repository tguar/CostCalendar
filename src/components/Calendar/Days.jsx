import React from 'react';
import styled from 'styled-components';
import Day from './Day';
import { Store } from '../../Store';

const DaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const daysOfTheMonth = [];

for (let i = 1; i <= 31; i++) {
  daysOfTheMonth.push(i);
}

const Days = props => {
  const { state } = React.useContext(Store);
  const { expenses } = state;
  console.log(expenses);
  return (
    <DaysWrapper>
      {daysOfTheMonth.map((day, index) => (
        <Day key={`.0${index}`} dayNumber={day} />
      ))}
    </DaysWrapper>
  );
};

export default Days;
