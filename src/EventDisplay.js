import React from "react";
import CropImage from "./components/CropImage";
import EventImage from "./EventImage";

const EventDisplay = ({ event }) => {
  if (
    event.type === "plant" ||
    event.type === "replant" ||
    event.type === "harvest"
  )
    return (
      <React.Fragment>
        <CropImage crop={event.crop} seed={event.type === "plant"} />
        <span>x{event.quantity}</span>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <EventImage event={event} />
        {event.name}
      </React.Fragment>
    );
};

export default EventDisplay;
