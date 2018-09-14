import React from "react";
import styled from "styled-components";
import produce from "immer";

import Season from "./calendar/Season";
import events from "./data/events";
import crops from "./data/crops";
const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
  font-size: .75em
`;

const SeasonLayout = styled.div`
  width: 40%
  padding: 10px 10px
  flex-grow: 1
`;

const seasons = [
  { name: "spring", start: 1, end: 28 },
  { name: "summer", start: 28 + 1, end: 28 * 2 },
  { name: "fall", start: 28 * 2 + 1, end: 28 * 3 },
  { name: "winter", start: 28 * 3 + 1, end: 28 * 4 }
];

export default class Calendar extends React.Component {
  state = {
    events: events,
    crops: crops
  };

  componentDidMount() {
    this.state.crops.forEach(crop => {
      this.addEvent(crop, crop.end - crop.growth);
    });
  }

  addEvent = (event, date) => {
    this.setState(
      produce(draft => {
        //does that day already have any events on it?
        if (!draft.events[date]) {
          //nope
          draft.events[date] = [];
        }
        draft.events[date].push(event);
      })
    );
  };

  render() {
    return (
      <CalendarLayout>
        {seasons.map(season => (
          <SeasonLayout key={season.name}>
            <Season
              season={season}
              events={this.state.events}
              crops={this.state.crops.filter(
                crop => crop.start <= season.start && crop.end > season.start
              )}
              addEvent={this.addEvent}
            />
          </SeasonLayout>
        ))}
      </CalendarLayout>
    );
  }
}
