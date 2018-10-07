import React from "react";
import produce from "immer";
import range from "lodash/range";

import events from "../data/events.json";

export default class EventProvider extends React.Component {
  state = {
    events: range(128).map(date => (events[date] ? events[date] : []))
  };

  createEvent = event => {};

  updateEvent = (old_event, new_event) => {};

  deleteEvent = event => {};

  render = () =>
    this.props.children({
      events: this.state.events,
      createEvents: this.createEvents,
      updateEvents: this.updateEvents,
      removeEvents: this.removeEvents
    });

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
}
