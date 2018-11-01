import React, { useMemo } from "react";
import range from "lodash/range";
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

function Season({ season, day: current_day, plans, setDay }) {
  const body = useMemo(
    () =>
      range(season.start, season.start + 28).map(day => {
        const actions = plans
          .flatMap(plan => plan.getCropActionsOnDate(day))
          .reduce((uniques, action) => {
            const unique = uniques.get(action.id);
            if (unique) {
              unique.quantity += action.quantity;
            } else {
              uniques.set(action.id, action);
            }
            return uniques;
          }, new Map())
          .values();

        return (
          <Style.Block key={day}>
            <Day
              key={day}
              day={day}
              selected={day === current_day}
              actions={[...actions]}
              setDay={setDay}
            />
          </Style.Block>
        );
      }),
    [season, current_day, plans]
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
