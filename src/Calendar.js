import React from "react";
import styled from "styled-components";
import produce from "immer";
import range from "lodash/range";
import EventEditor from "./calendar/EventEditor";

import Season from "./calendar/Season";
import Day from "./calendar/Day";

import events from "./data/events";
import crops from "./data/crops";

const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
`;

const events_by_date = range(128).map(
  date => (events[date] ? events[date] : [])
);

export default class Calendar extends React.Component {
  static crops = range(128).map(date =>
    crops.filter(crop => date >= crop.start && date + crop.growth <= crop.end)
  );

  static seasons = [
    { name: "spring", start: 1 },
    { name: "summer", start: 29 },
    { name: "fall", start: 57 },
    { name: "winter", start: 85 }
  ];

  state = {
    events: events_by_date,
    date: 1,
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

  handleSelectDate = date => {
    this.setState({ date });
  };

  render() {
    const seasons = Calendar.seasons.map(season => (
      <Season key={season.name} season={season}>
        {range(28).map(day => {
          const day_in_year = day + season.start;
          return (
            <Day
              key={day}
              day_in_month={day + 1}
              day_in_year={day_in_year}
              selected={this.state.date === day_in_year}
              events={this.state.events[day_in_year]}
              selectDate={this.handleSelectDate}
            />
          );
        })}
      </Season>
    ));
    return (
      <React.Fragment>
        <EventEditor
          key={this.state.date}
          date={this.state.date}
          crops={Calendar.crops[this.state.date]}
          events={this.state.events[this.state.date]}
          createEvents={this.createEvents}
          updateEvents={this.updateEvents}
          removeEvents={this.removeEvents}
        />

        <CalendarLayout>{seasons}</CalendarLayout>
      </React.Fragment>
    );
  }
}
