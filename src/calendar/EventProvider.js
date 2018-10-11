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
      date => new CropEvent({ ...seed, date })
    );
    const harvest_events = harvest_dates.map(date => seed.harvest(date));
    return [...plant_events, ...harvest_events];
  };

  createCropEvent = event => {
    this.createEvents(this.extrapolateCropEvents(event));
  };

  updateCropEvent = (old_event, new_event) => {
    this.deleteCropEvent(old_event);
    this.createCropEvent(new_event);
  };

  deleteCropEvent = event => {
    this.removeEvents(this.extrapolateCropEvents(event));
  };

  render = () =>
    this.props.children(
      this.state.events,
      this.createCropEvent,
      this.updateCropEvent,
      this.deleteCropEvent
    );

  createEvents = new_events => {
    this.setState(
      produce(draft => {
        new_events.forEach(event => {
          const events_by_date = draft.events[event.date];

          const index = events_by_date.findIndex(
            old_event => old_event.id === event.id
          );

          if (index < 0) {
            events_by_date.push(event);
          } else {
            //Immer does not support changing class properties
            const new_event = new CropEvent({
              ...event,
              crop: {
                ...event.crop
              },
              fertilizer: {
                ...event.fertilizer
              },
              quantity: events_by_date[index].quantity + event.quantity
            });
            events_by_date[index] = new_event;
          }
          events_by_date.sort(({ id: a }, { id: b }) => a.localeCompare(b));
        });
      })
    );
  };

  removeEvents = remove_events => {
    this.setState(
      produce(draft => {
        remove_events.forEach(event => {
          const index = draft.events[event.date].findIndex(
            old_event => old_event.id === event.id
          );
          draft.events[event.date].splice(index, 1);
        });
      })
    );
  };
}
