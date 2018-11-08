import React from "react";

function EventImage({ plan, name }) {
  let src;
  if (plan.type === "festival") src = `/images/events/festival.gif`;
  else src = `/images/events/${plan.id}.png`;
  return <img src={src} alt={name} height={10} />;
}

export default React.memo(EventImage);
