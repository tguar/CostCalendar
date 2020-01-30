import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Day from './Day';
import { removeCommasFromString } from '../../helpers';
import { Store } from '../../Store';

const DaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const daysOfTheMonth = [];

const getCurrentMonthNumber = () => {
  return new Date().getMonth();
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const getStartingDayNumber = () => {
  return new Date(getCurrentYear(), getCurrentMonthNumber(), 1).getDay();
};

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const calculateDecimalPointToString = val => {
  if (val < 10) {
    return `.0${val}`;
  }
  return `.${val}`;
};

const checkIfWeekend = i => {
  if (
    (parseInt(i) + getStartingDayNumber()) % 7 === 0 ||
    (parseInt(i) + getStartingDayNumber() - 1) % 7 === 0
  )
    return true;
  else {
    return false;
  }
};
for (
  let i = 1;
  i <= daysInMonth(getCurrentMonthNumber(), getCurrentYear());
  i++
) {
  daysOfTheMonth.push({ number: i });
}

const disabledMap = {};
for (let i in daysOfTheMonth) {
  disabledMap[daysOfTheMonth[i].number] = false;
}

// Assumption is still that 40 hours a week is worked and 4 weeks of work per month
const calculateIncome = (rate, incomeCalculationType) => {
  let rateNumber = removeCommasFromString(rate);
  switch (incomeCalculationType) {
    // daily
    case 1: {
      rateNumber *= 20;
      break;
    }
    // weekly
    case 2: {
      rateNumber *= 4;
      break;
    }
    // bi-weekly
    case 3: {
      rateNumber *= 2;
      break;
    }
    // semi-weekly
    case 4: {
      rateNumber *= 2;
      break;
    }
    // monthly
    case 5: {
      break;
    }
    // hourly
    case 0:
    default: {
      rateNumber = rateNumber * 4 * 40;
      break;
    }
  }
  return rateNumber;
};

const Days = () => {
  const { state } = React.useContext(Store);
  const { hourlyRate, expenses, incomeCalculationType } = state;
  const [isDisabledMap, setIsDisabledMap] = useState({ ...disabledMap });

  const income = calculateIncome(hourlyRate, incomeCalculationType);

  const colors = [];
  const fill = [];

  expenses.forEach(expense => {
    const percent =
      (removeCommasFromString(expense.expenseAmount) / income) * 100;
    colors.push({
      color: expense.expenseColor,
      monthPercent: percent || 0,
      dayPercent: percent * 20 || 0,
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
      isDisabledMap[day.number] ||
      (state.weekendDisabled && checkIfWeekend(day.number))
    ) {
      day.fill = null;
      return;
    }
    if (
      //   (day.number + getStartingDayNumber()) % 7 === 0 ||
      //   (day.number + getStartingDayNumber() - 1) % 7 === 0 ||
      index >= fill.length
    ) {
      day.fill = null;
    } else {
      day.fill = fill[index++];
    }
  });

  const handleOnClick = day => {
    setIsDisabledMap({ ...isDisabledMap, [day]: !isDisabledMap[day] });
  };

  return (
    <DaysWrapper>
      {Array.from({ length: getStartingDayNumber() }, (value, index) => (
        <Day key={`x${index}`} />
      ))}
      {daysOfTheMonth.map((day, index) => (
        <Day
          key={calculateDecimalPointToString(index)}
          dayNumber={day.number}
          fill={day.fill}
          isDisabled={
            isDisabledMap[day.number] ||
            (state.weekendDisabled && checkIfWeekend(day.number))
          }
          onClick={() => handleOnClick(day.number)}
        />
      ))}
    </DaysWrapper>
  );
};

export default Days;
