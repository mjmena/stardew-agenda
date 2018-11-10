import React, { useState, useCallback, useMemo } from "react";
import Season from "./Season";
import PlanEditor from "./PlanEditor";
import Drawer from "./components/Drawer";
import useCropPlanReducer from "./utils/useCropPlanReducer";
import { capitalize, range } from "lodash";
import events from "./data/events";
const seasons = [
  { name: "spring", start: 0 },
  { name: "summer", start: 28 },
  { name: "fall", start: 56 },
  { name: "winter", start: 84 }
];

function getActionsOnDate(date, plans) {
  const actions = Array.from(
    plans
      .flatMap(plan => plan.getCropActionsOnDate(date))
      .reduce((uniques, action) => {
        const unique = uniques.get(action.id);
        if (unique) {
          unique.quantity += action.quantity;
        } else {
          uniques.set(action.id, action);
        }
        return uniques;
      }, new Map())
      .values()
  );
  if (events[date]) return [...events[date], ...actions];
  return actions;
}

function usePlansForActions(plans, season) {
  return useMemo(
    () =>
      range(season.start, season.start + 28).map(day =>
        getActionsOnDate(day, plans)
      ),
    [plans, season]
  );
}

function Calendar() {
  const [season, setSeason] = useState(0);
  const [day, setDay] = useState(0);
  const [plans, createPlan, updatePlan, deletePlan] = useCropPlanReducer([]);
  const actions = usePlansForActions(plans, seasons[season]);
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
        actions={actions}
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

export default React.memo(Calendar);
