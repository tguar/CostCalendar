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
  daysOfTheMonth.push({ dayNumber: i });
}

const Days = props => {
  const { state } = React.useContext(Store);
  const { hourlyRate, expenses } = state;

  const workHours = 40 * 4;
  const income =
    parseFloat(hourlyRate.substring(2).replace(/,/g, '')) * workHours;

  const fill = [];

  expenses.forEach(expense => {
    const percent = (parseFloat(expense.expenseAmount) / income) * 100;
    fill.push({
      color: expense.expenseColor,
      monthPercent: percent,
      dayPercent: Math.ceil(percent * 16)
    });
  });

  console.log(fill);

  return (
    <DaysWrapper>
      {daysOfTheMonth.map((day, index) => (
        <Day key={`.0${index}`} dayNumber={day.dayNumber} />
      ))}
    </DaysWrapper>
  );
};

export default Days;
