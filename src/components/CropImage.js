import React from "react";

const CropImage = props => {
  let src;
  if (props.seed) src = `/images/seeds/${props.crop.id}.png`;
  else src = `/images/crops/${props.crop.id}.png`;
  return <img src={src} alt={props.crop.name} width={20} />;
};
export default CropImage;
