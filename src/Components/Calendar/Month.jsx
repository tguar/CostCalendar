import React, { Fragment } from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import Dropdown from './Dropdown';
import { Store } from '../../Store';
import { removeCommasFromString } from '../../helpers';

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

  const inputOnChange = e => {
    const { value } = e.target;
    dispatch({
      type: 'SET_HOURLY_RATE',
      payload: removeCommasFromString(value).toString(),
    });
  };

  const inputOnBlur = e => {
    const { hourlyRate } = state;
    dispatch({
      type: 'SET_HOURLY_RATE',
      payload: removeCommasFromString(hourlyRate).toFixed(2),
    });
  };

  const dropdownOnChange = e =>
    dispatch({
      type: 'SET_INCOME_CALCULATION_TYPE',
      payload: e,
    });

  return (
    <Fragment>
      <Rate>
        <div className="input-group">
          <Cleave
            className="form-control"
            onBlur={inputOnBlur}
            onChange={inputOnChange}
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
              numeralPositiveOnly: true,
            }}
            placeholder="0.00"
            value={state.hourlyRate}
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
