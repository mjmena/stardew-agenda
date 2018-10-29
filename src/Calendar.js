import React, { useState, useCallback } from "react";
import Season from "./Season";
import PlanEditor from "./PlanEditor";
import Drawer from "./components/Drawer";
import useCropPlanReducer from "./utils/useCropPlanReducer";

const seasons = [
  { name: "spring", start: 0 },
  { name: "summer", start: 28 },
  { name: "fall", start: 56 },
  { name: "winter", start: 84 }
];

export default function Calendar() {
  const [season, setSeason] = useState(0);
  const [day, setDay] = useState(0);
  const [plans, createPlan, updatePlan, deletePlan] = useCropPlanReducer([]);
  const [visible, setVisible] = useState(0);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <>
      <NumberInput value={season} onChange={setSeason} />

      <Season
        season={seasons[season]}
        day={day}
        plans={plans}
        setDay={setDay}
      />
      <Drawer visible={visible} onOpen={open} onClose={close}>
        <PlanEditor
          date={day}
          plans={plans}
          createCropPlan={createPlan}
          updateCropPlan={updatePlan}
          deleteCropPlan={deletePlan}
        />
      </Drawer>
    </>
  );
}

// A Input for positive numbers that can be null
// Useful for inputs with a placeholder
function NumberInput({ value, onChange, ...attrs }) {
  function handleChange(e) {
    const number = Number.parseInt(e.target.value.replace(/\D/, ""), 10);

    if (Number.isNaN(number)) {
      onChange(0);
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
