import React, { useMemo } from "react";
import range from "lodash/range";
import styled from "styled-components";
import Day from "./Day";

const day_names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const StyledSeason = styled.div`
  display: flex
  flex-wrap: wrap
  flex-grow: 1
`;

const StyledTitle = styled.div`
    flex-grow: 1
    width: 100%
    text-align: center
`;

const StyledSeasonBlock = styled.div`
  flex-grow: 1
  width: 13%
  border: 1px solid black
`;

const StyledDay = styled(StyledSeasonBlock)`
  height: 100px;
`;

const header = day_names.map(day => (
  <StyledSeasonBlock key={day}>{day}</StyledSeasonBlock>
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
          <StyledDay key={day}>
            <Day
              key={day}
              day={day}
              selected={day === current_day}
              actions={[...actions]}
              setDay={setDay}
            />
          </StyledDay>
        );
      }),
    [season, current_day, plans]
  );

  return (
    <StyledSeason>
      <StyledTitle>{season.name}</StyledTitle>
      {header}
      {body}
    </StyledSeason>
  );
}

export default React.memo(Season);
