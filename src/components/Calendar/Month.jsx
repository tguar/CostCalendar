import React from "react";
// import PropTypes from "prop-types";
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
  const [inputText, setInputState] = React.useState("");

  console.log(state);

  // React.useEffect(() => {
  //   state.hourlyRate === 0 && inputOnChange();
  // });

  const inputOnChange = e => {
    setInputState(e.target.value);

    return dispatch({
      type: "SET_HOURLY_RATE",
      payload: e.target.value
    });
  };

  return (
    <div>
      <Rate>
        $<input type="text" onChange={inputOnChange} value={inputText} />/ hour
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
    </div>
  );
};

export default Month;
