import React from "react";

function getSourceAndAlt(action) {
  switch (action.type) {
    case "plant":
      return {
        src: `/images/seeds/${action.crop.id}.png`,
        alt: action.crop.id
      };
    case "harvest":
      return {
        src: `/images/crops/${action.crop.id}.png`,
        alt: action.crop.id
      };
    case "festival":
      return {
        src: `/images/events/festival.gif`,
        alt: action.name
      };
    case "birthday":
      return {
        src: `/images/events/${action.id}.png`,
        alt: action.name
      };
    default:
      return;
  }
}

function ActionImage({ action, ...props }) {
  return <img alt="" height={20} {...getSourceAndAlt(action)} {...props} />;
}

export default React.memo(ActionImage);
