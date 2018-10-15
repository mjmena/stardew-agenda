import produce from "immer";
import CropEvent from "../calendar/event/CropEvent.js";

const createCropEventAction = event => ({ type: "create", event });
const deleteCropEventAction = event => ({ type: "delete", event });

const cropEventReducer = (state, action) => {
  switch (action.type) {
    case "create":
      return createEvent(action.event, state);
    case "delete":
      return deleteEvent(action.event, state);
    default:
      return state;
  }
};

const extrapolateCropEvents = seed => {
  if (seed.shouldReplant()) {
    const plant_events = [seed, ...seed.getReplantEvents()];
    const harvest_events = plant_events.map(
      plant_event => plant_event.getHarvestEvents()[0]
    );
    return [...plant_events, ...harvest_events];
  } else {
    return [seed, ...seed.getHarvestEvents()];
  }
};

const createEvent = (created_event, state) => {
  const created_events = extrapolateCropEvents(created_event);
  return produce(state, draft => {
    created_events.forEach(event => {
      const events_by_date = draft[event.date];

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
  });
};

const deleteEvent = (deleted_event, state) => {
  const deleted_events = extrapolateCropEvents(deleted_event);
  return produce(state, draft => {
    deleted_events.forEach(event => {
      const index = draft[event.date].findIndex(
        old_event => old_event.id === event.id
      );
      draft[event.date].splice(index, 1);
    });
  });
};

export { createCropEventAction, deleteCropEventAction, cropEventReducer };
