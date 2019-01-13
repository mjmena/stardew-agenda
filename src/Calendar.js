import React, { useState, useCallback, useMemo, useReducer } from "react";
import Season from "./Season";
import PlanEditor from "./PlanEditor";
import Drawer from "./components/Drawer";
import useCropPlanReducer from "./utils/useCropPlanReducer";
import { capitalize, range } from "lodash";
import events from "./data/events";

const seasons = ["spring", "summer", "fall", "winter"];

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
    () => range(season, season + 28).map(day => getActionsOnDate(day, plans)),
    [plans, season]
  );
}

function Calendar() {
  const [{ year, season, day }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "increment_year":
          return { ...state, year: state.year + 1, day: 0 };
        case "decrement_year":
          if (state.year === 0) return state;
          return { ...state, year: state.year - 1, day: 0 };
        case "set_year":
          return { ...state, year: action.year, day: 0 };
        case "set_season":
          if (state.season === action.season) return state;
          return { ...state, season: action.season, day: 0 };
        case "set_day":
          return { ...state, day: action.day };
        default:
          return state;
      }
    },
    { year: 0, season: 0, day: 0 }
  );

  const [plans, createPlan, updatePlan, deletePlan] = useCropPlanReducer([]);
  const actions = usePlansForActions(plans, season * 28);
  const [visible, setVisible] = useState(true);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const season_picker = seasons.map((season, index) => (
    <button
      key={season}
      onClick={e =>
        dispatch({
          type: "set_season",
          season: Number.parseInt(e.target.value)
        })
      }
      value={index}
    >
      {capitalize(season)}
    </button>
  ));

  return (
    <>
      <div>{`${year} - ${season} - ${day}`} </div>
      <button onClick={() => dispatch({ type: "decrement_year" })}>
        Decrement
      </button>
      {year + 1}
      <button onClick={() => dispatch({ type: "increment_year" })}>
        Increment
      </button>

      {season_picker}
      <Season
        season={seasons[season]}
        day={day}
        actions={actions}
        setDay={new_day => dispatch({ type: "set_day", day: new_day })}
      />
      <Drawer visible={visible} onOpen={open} onClose={close}>
        <PlanEditor
          key={day}
          date={year * 112 + season * 28 + day}
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
