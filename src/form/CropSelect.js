import React from "react";

function CropSelect({ value, handleValue, crops }) {
  const handleCropChange = e => {
    handleValue(crops[e.target.value]);
  };

  const crop_options = crops.map((crop, index) => (
    <option key={crop.id} value={index}>
      {crop.name}
    </option>
  ));

  const index = crops.findIndex(crop => crop === value);

  return (
    <select onChange={handleCropChange} value={index}>
      <option key={-1} value={-1}>
        Select a Crop
      </option>
      {crop_options}
    </select>
  );
}

export default React.memo(CropSelect);
