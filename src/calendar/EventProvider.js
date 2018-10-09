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
      ? range(date + crop.growth, crop.end + 1, crop.regrowth)
      : plant_dates.map(plant_date => plant_date + crop.growth);

    const plant_events = plant_dates.map(
      date => new CropEvent(Object.assign({}, seed, { date }))
    );
    const harvest_events = harvest_dates.map(date => seed.harvest(date));
    return [...plant_events, ...harvest_events];
  };

  createCropEvent = event => {
    console.log(`seed = ${event.id}`);
    this.createEvents(this.extrapolateCropEvents(event));
  };

  updateCropEvent = (old_event, new_event) => {
    console.log(this.state.events[1]);
    console.log(`old = ${old_event.id}`);
    console.log(`new = ${new_event.id}`);

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
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );
          if (index < 0) {
            draft.events[event.date].push(event);
          } else {
            //Immer does not support changing class properties
            const new_event = new CropEvent({
              ...event,
              quantity:
                draft.events[event.date][index].quantity + event.quantity
            });
            draft.events[event.date][index] = new_event;
          }
        });
      }),
      () => {
        console.log(this.state.events[1]);
      }
    );
  };

  removeEvents = remove_events => {
    this.setState(
      produce(draft => {
        remove_events.forEach(event => {
          draft.events[event.date].forEach(old_event => console.log(old_event));
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );
          draft.events[event.date].splice(index, 1);
        });
      })
    );
  };
}
