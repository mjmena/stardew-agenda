import React from "react";

// A Input for positive numbers that can be null
// Useful for inputs with a placeholder
function NumberInput({ value, onChange, ...attrs }) {
  function handleChange(e) {
    const number = Number.parseInt(e.target.value.replace(/\D/, ""), 10);

    if (Number.isNaN(number)) {
      onChange(null);
    } else {
      onChange(number);
    }
  }

  return (
    <input
      type="text"
      value={Number.isInteger(value) ? value : ""}
      onChange={handleChange}
      {...attrs}
    />
  );
}

export default React.memo(NumberInput);
