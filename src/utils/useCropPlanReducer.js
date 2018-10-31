import { useReducer } from "react";
import planReducer from "./planReducer";

function useCropPlanReducer(initialState = []) {
  const [state, dispatch] = useReducer(planReducer, initialState);
  const createPlanAction = plan => dispatch({ type: "create", plan });
  const updatePlanAction = (old_plan, new_plan) =>
    dispatch({ type: "update", old_plan, new_plan });
  const deletePlanAction = plan => dispatch({ type: "delete", plan });
  return [state, createPlanAction, updatePlanAction, deletePlanAction];
}

export default useCropPlanReducer;
