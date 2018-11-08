import React, { useState, useCallback } from "react";
import Season from "./Season";
import PlanEditor from "./PlanEditor";
import Drawer from "./components/Drawer";
import useCropPlanReducer from "./utils/useCropPlanReducer";
import capitalize from "lodash/capitalize";

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
  const [visible, setVisible] = useState(true);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  function handleSeasonClick(e) {
    setDay(e.target.value * 28);
    setSeason(e.target.value);
  }

  const season_picker = seasons.map((season, index) => (
    <button key={season.name} onClick={handleSeasonClick} value={index}>
      {capitalize(season.name)}
    </button>
  ));

  return (
    <>
      {season_picker}
      <Season
        season={seasons[season]}
        day={day}
        plans={plans}
        setDay={setDay}
      />
      <Drawer visible={visible} onOpen={open} onClose={close}>
        <PlanEditor
          key={day}
          date={day}
          plans={plans}
          createPlan={createPlan}
          updatePlan={updatePlan}
          deletePlan={deletePlan}
        />
      </Drawer>
    </>
  );
}
