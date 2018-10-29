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
      <>
        <CropImage crop={event.crop} seed={event.type === "plant"} />
        <span>x{event.quantity}</span>
      </>
    );
  else
    return (
      <>
        <EventImage event={event} />
        {event.name}
      </>
    );
};

export default React.memo(EventDisplay);
