import React from "react";

const EventImage = props => {
  let src;
  if (props.event.type === "festival") src = `/images/events/festival.gif`;
  else src = `/images/events/${props.event.id}.png`;
  return <img src={src} alt={props.name} height={10} />;
};
export default EventImage;
