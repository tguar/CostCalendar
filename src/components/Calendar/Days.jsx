import React from "react";
import styled from "styled-components";
import Day from "./Day";

const DaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const daysOfTheMonth = [];

for (let i = 1; i <= 31; i++) {
  daysOfTheMonth.push(i);
}

const Days = props => {
  return (
    <DaysWrapper>
      {daysOfTheMonth.map((day, index) => (
        <Day key={`.0${index}`} dayNumber={day} />
      ))}
    </DaysWrapper>
  );
};

export default Days;
