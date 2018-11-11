import React from "react";
import { ReactComponent as None } from "../images/x.svg";

function FertilizerImage({ fertilizer, faded }) {
  if (fertilizer.id === "none")
    return <None height={30} fill={faded ? "black" : "red"} />;
  return (
    <img
      src={`/images/fertilizers/${fertilizer.id}.png`}
      alt={fertilizer.name}
      height={30}
      style={{ filter: faded ? "grayscale(100%)" : "none" }}
    />
  );
}
export default React.memo(FertilizerImage);
