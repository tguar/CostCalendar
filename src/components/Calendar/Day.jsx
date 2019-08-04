import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DayWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 14.285%;
  height: 50px;
  justify-content: center;
`;

const Day = props => {
  const { dayNumber } = props;
  return <DayWrapper>{dayNumber}</DayWrapper>;
};

Day.propTypes = {
  dayNumber: PropTypes.number.isRequired
};

export default Day;
