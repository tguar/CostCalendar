import React from 'react';
import styled from 'styled-components';
import Day from './Day';
import { Store } from '../../Store';

const DaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const daysOfTheMonth = [];

const getCurrentMonthNumber = () => {
  return new Date().getMonth();
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}

const getStartingDayNumber = () => {
  return new Date(getCurrentYear(), getCurrentMonthNumber(), 1).getDay();
}

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
}

const calculateDecimalPointToString = (val) => {
  if(val < 10)
  {
    return `.0${val}`;
  }
  return `.${val}`;
}

for (let i = 1; i <= daysInMonth(getCurrentMonthNumber(), getCurrentYear()); i++) {
  daysOfTheMonth.push({ number: i });
}
console.log(getStartingDayNumber());
const Days = () => {
  const { state } = React.useContext(Store);
  const { hourlyRate, expenses, incomeCalculationType } = state;

  const income = calculateIncome(hourlyRate, incomeCalculationType);

  const colors = [];
  const fill = [];

  expenses.forEach((expense) => {
    const percent = (parseFloat(expense.expenseAmount) / income) * 100;
    colors.push({
      color: expense.expenseColor,
      monthPercent: percent || 0,
      dayPercent: percent * 20 || 0,
    });
  });

  let index = 0;
  while (
    index < colors.length
    && hourlyRate
    && fill.length <= daysOfTheMonth.length
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
  daysOfTheMonth.forEach((day) => {
    if (
      (day.number + getStartingDayNumber())% 7 === 0 ||
      ((day.number + getStartingDayNumber())- 1) % 7 === 0 ||
      index >= fill.length
    ) {
      day.fill = null;
    } else {
      day.fill = fill[index++];
    }
  });

  return (
    <DaysWrapper>
      { Array.from({length: getStartingDayNumber()}, (value, index) => <Day key={`x${index}`} />) }
      {daysOfTheMonth.map((day, index) => (
        <Day key={calculateDecimalPointToString(index)} dayNumber={day.number} fill={day.fill} />
      ))}
    </DaysWrapper>
  );
};

export default Days;
