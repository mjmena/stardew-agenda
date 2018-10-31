import React, { useCallback } from "react";
import fertilizers from "../data/fertilizers";

function FertilizerRadio({ value, handleValue, tag }) {
  const handleChange = useCallback(
    e => handleValue(fertilizers[e.target.value]),
    []
  );

  const fertilizer_radios = fertilizers.map((fertilizer, index) => (
    <React.Fragment key={fertilizer.id}>
      <input
        type="radio"
        id={fertilizer.id + "-" + tag}
        name={"fertilizer-" + tag}
        value={index}
        checked={fertilizer === value}
        onChange={handleChange}
      />
      <label htmlFor={fertilizer.id + "-" + tag}>{fertilizer.name}</label>
    </React.Fragment>
  ));

  return <>{fertilizer_radios}</>;
}

export default React.memo(FertilizerRadio);
export const none = fertilizers[0];
