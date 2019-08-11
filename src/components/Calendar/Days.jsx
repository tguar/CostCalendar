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
  daysOfTheMonth.push({ number: i });
}

const Days = () => {
  const { state } = React.useContext(Store);
  const { hourlyRate, expenses } = state;

  const workHours = 40 * 4;
  const income =
    parseFloat(hourlyRate.substring(2).replace(/,/g, '')) * workHours;

  const colors = [];
  const fill = [];

  expenses.forEach(expense => {
    const percent = (parseFloat(expense.expenseAmount) / income) * 100;
    colors.push({
      color: expense.expenseColor,
      monthPercent: percent || 0,
      dayPercent: percent * 20 || 0
    });
  });

  let index = 0;
  while (
    index < colors.length &&
    hourlyRate &&
    fill.length <= daysOfTheMonth.length
  ) {
    let capacity = 100;
    const colorMap = {};

    while (capacity > 0 && index < colors.length) {
      const { color } = colors[index];
      if (capacity > colors[index].dayPercent) {
        capacity -= colors[index].dayPercent;
        colorMap[color] = colors[index].dayPercent;
        colors[index].dayPercent = 0;
        index++;
      } else {
        colorMap[color] = capacity;
        colors[index].dayPercent -= capacity;
        capacity = 0;
      }
    }

    fill.push(colorMap);
  }

  index = 0;
  daysOfTheMonth.forEach(day => {
    if (
      day.number % 7 === 0 ||
      (day.number - 1) % 7 === 0 ||
      index >= fill.length
    ) {
      day.fill = null;
    } else {
      day.fill = fill[index++];
    }
  });

  console.log(fill);

  return (
    <DaysWrapper>
      {daysOfTheMonth.map((day, index) => (
        <Day key={`.0${index}`} dayNumber={day.number} fill={day.fill} />
      ))}
    </DaysWrapper>
  );
};

export default Days;
