import React from "react";
import styled from "styled-components";
import range from "lodash/range";
import Day from "./Day";

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

export default class Season extends React.Component {
  static names_of_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  static days_in_season = range(1, 29);

  state = {
    crops: Season.days_in_season.reduce((crops_by_day, day) => {
      crops_by_day[day] = this.props.crops.filter(
        crop => day + this.props.season.start - 1 <= crop.end - crop.growth
      );
      return crops_by_day;
    }, {})
  };

  render() {
    const { season, events, ...handlers } = this.props;
    const date_offset = season.start - 1;
    return (
      <StyledSeason>
        <StyledTitle>{season.name}</StyledTitle>
        {Season.names_of_days.map(day => (
          <StyledSeasonBlock key={day}>{day}</StyledSeasonBlock>
        ))}

        {Season.days_in_season.map(day_in_season => {
          const day_in_year = day_in_season + date_offset;
          return (
            <StyledDay key={day_in_year}>
              <Day
                {...handlers}
                date={day_in_year}
                events={events[day_in_year]}
                crops={this.state.crops[day_in_season]}
              />
            </StyledDay>
          );
        })}
      </StyledSeason>
    );
  }
}
