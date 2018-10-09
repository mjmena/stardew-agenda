import React from "react";
import produce from "immer";
import range from "lodash/range";

import CropEvent from "./event/CropEvent.js";
import events from "../data/events.json";

export default class EventProvider extends React.Component {
  state = {
    events: range(128).map(date => (events[date] ? events[date] : []))
  };

  extrapolateCropEvents = seed => {
    const { date, crop } = seed;
    const plant_dates = !seed.shouldReplant()
      ? [date]
      : range(date, crop.end - crop.growth + 1, crop.growth);
    const harvest_dates = crop.regrowth
      ? range(date + crop.growth + crop.regrowth, crop.end + 1, crop.regrowth)
      : plant_dates.map(plant_date => plant_date + crop.growth);

    const plant_events = plant_dates.map(
      date => new CropEvent(Object.assign({}, seed, { date }))
    );
    const harvest_events = harvest_dates.map(date => seed.harvest(date));

    return [...plant_events, ...harvest_events];
  };

  createCropEvent = event => {
    this.createEvents(this.extrapolateCropEvents(event));
  };

  updateCropEvent = (old_event, new_event) => {
    this.removeEvents(this.extrapolateCropEvents(old_event));
    this.createEvents(this.extrapolateCropEvents(new_event));
  };

  deleteEvent = event => {};

  render = () =>
    this.props.children(
      this.state.events,
      this.createCropEvent,
      this.updateCropEvent,
      this.removeCropEvent
    );

  createEvents = new_events => {
    this.setState(
      produce(draft => {
        new_events.forEach(event => {
          const events = draft.events[event.date];

          const index = events.findIndex(
            old_event => old_event.id === event.id
          );

          if (index < 0) {
            events.push(event);
          } else {
            //Immer does not support changing class properties
            events[index] = new CropEvent({
              ...event,
              quantity: events[index].quantity + event.quantity
            });
          }
        });
      })
    );
  };

  removeEvents = events => {
    this.setState(
      produce(draft => {
        events.forEach(event => {
          console.log(event);
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );
          console.log(draft.events[event.date][index]);
          draft.events[event.date].splice(index, 1);
          console.log(draft.events[event.date][index]);
        });
      })
    );
  };
}