import React, { useMemo } from "react";
import { range } from "lodash";

import Day from "./Day";
import Style from "./Season.style";

const day_names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const header = day_names.map(day => (
  <Style.Header key={day}>{day}</Style.Header>
));

function Season({ season, day: current_day, actions, setDay }) {
  const days = range(season.start, season.start + 28);

  const body = useMemo(
    () =>
      days.map((day, index) => (
        <Style.Block key={day} selected={day === current_day}>
          <Day key={day} day={day} setDay={setDay} actions={actions[index]} />
        </Style.Block>
      )),
    [current_day, actions]
  );

  return (
    <Style.Container>
      <Style.Title>{season.name}</Style.Title>
      {header}
      {body}
    </Style.Container>
  );
}

export default React.memo(Season);
