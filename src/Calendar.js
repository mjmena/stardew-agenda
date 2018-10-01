import React from "react";
import styled from "styled-components";
import produce from "immer";
import EventEditor from "./calendar/EventEditor";
import Season from "./calendar/Season";
import events from "./data/events";
import crops from "./data/crops";

const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
`;

const days_in_season = 28;
const days_in_year = 112;

const seasons = [
  { name: "spring", start: 1, end: days_in_season },
  { name: "summer", start: days_in_season + 1, end: days_in_season * 2 },
  { name: "fall", start: days_in_season * 2 + 1, end: days_in_season * 3 },
  { name: "winter", start: days_in_season * 3 + 1, end: days_in_year }
];

export default class Calendar extends React.Component {
  static crops = seasons.reduce((crops_by_season, season) => {
    crops_by_season[season.name] = crops.filter(
      crop => crop.start <= season.start && crop.end > season.start
    );
    return crops_by_season;
  }, {});

  state = {
    events: events,
    day: 1,
    visible: true
  };

  createEvents = new_events => {
    this.setState(
      produce(draft => {
        new_events.forEach(event => {
          if (!draft.events[event.date]) {
            draft.events[event.date] = [event];
          } else {
            const events = draft.events[event.date];

            const index = events.findIndex(
              old_event => old_event.id === event.id
            );
            if (index < 0) {
              events.push(event);
            } else {
              events[index].quantity += Number.parseInt(event.quantity, 10);
            }
          }
        });
      })
    );
  };

  updateEvents = new_events => {
    this.setState(
      produce(draft => {
        new_events.forEach(event => {
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );

          draft.events[event.date][index] = event;
        });
      })
    );
  };

  removeEvents = events => {
    this.setState(
      produce(draft => {
        events.forEach(event => {
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );

          if (index >= 0) {
            const old_event = draft.events[event.date][index];

            if (old_event.quantity !== event.quantity) {
              old_event.quantity -= event.quantity;
            } else {
              draft.events[event.date].splice(index, 1);
            }
          }
        });
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        <EventEditor
          date={this.state.day}
          crops={Calendar.crops.spring}
          events={this.state.events[this.state.day]}
          createEvents={this.createEvents}
          updateEvents={this.updateEvents}
          removeEvents={this.removeEvents}
        />

        <CalendarLayout>
          {seasons.map(season => (
            <Season
              key={season.name}
              season={season}
              events={this.state.events}
              crops={Calendar.crops[season.name]}
              createEvents={this.createEvents}
              updateEvents={this.updateEvents}
              removeEvents={this.removeEvents}
            />
          ))}
        </CalendarLayout>
      </React.Fragment>
    );
  }
}
