import React, { Fragment } from "react";
import styled from "styled-components";
import { Store } from "../../Store";

const Rate = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
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

const Month = props => {
  const { state, dispatch } = React.useContext(Store);

  console.log(state);

  const inputOnChange = e => {
    return dispatch({
      type: "SET_HOURLY_RATE",
      payload: e.target.value
    });
  };

  return (
    <Fragment>
      <Rate>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="text"
            className="form-control"
            data-type="currency"
            aria-label="Hourly rate"
            placeholder="0.00"
            onBlur={inputOnChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">per hour</span>
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
