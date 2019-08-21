import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputCurrency from 'react-input-currency';
import Dropdown from './Dropdown';
import { Store } from '../../Store';

const Rate = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  border-radius: 5px;
`;

const Week = styled.div`
  display: flex;
`;

const WeekDay = styled.div`
  flex: 1;
  text-align: center;

  abbr {
    cursor: default;
    text-decoration: none;
  }
`;

const Month = () => {
  const { state, dispatch } = React.useContext(Store);

  // console.log(state);

  const inputOnChange = e => dispatch({
    type: 'SET_HOURLY_RATE',
    payload: e,
  });

  const dropdownOnChange = e => dispatch({
    type: 'SET_INCOME_CALCULATION_TYPE',
    payload: e,
  });

  return (
    <Fragment>
      <Rate>
        <div className="input-group">
          <InputCurrency
            value={state.hourlyRate}
            onChange={({ value }) => inputOnChange(value)}
            className="form-control"
          />
          <div className="input-group-append">
            <Dropdown onChange={({ value }) => dropdownOnChange(value)} />
          </div>
        </div>
      </Rate>
      <Week>
        <WeekDay>
          <abbr title="Sunday" aria-label="Sunday">
            Sun
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Monday" aria-label="Monday">
            Mon
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Tuesday" aria-label="Tuesday">
            Tue
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Wednesday" aria-label="Wednesday">
            Wed
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Thursday" aria-label="Thursday">
            Thu
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Friday" aria-label="Friday">
            Fri
          </abbr>
        </WeekDay>
        <WeekDay>
          <abbr title="Saturday" aria-label="Saturday">
            Sat
          </abbr>
        </WeekDay>
      </Week>
    </Fragment>
  );
};

export default Month;
