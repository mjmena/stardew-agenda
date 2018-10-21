import CropPlan from "./CropPlan.js";

const createCropPlanAction = plan => ({ type: "create", plan });
const deleteCropPlanAction = plan => ({ type: "delete", plan });

function cropPlanReducer(state, action) {
  switch (action.type) {
    case "create":
      return createPlan(action.plan, state);
    case "delete":
      return deletePlan(action.plan, state);
    default:
      return state;
  }
}

function createPlan(created_plan, state) {
  const index = state.findIndex(
    plan => CropPlan.compare(plan, created_plan) === 0
  );

  if (index >= 0) {
    const same_plan = state[index];
    const plans = state.filter(
      plan => CropPlan.compare(plan, created_plan) !== 0
    );
    const merged_crop = CropPlan.merge(same_plan, created_plan);
    const new_state = [merged_crop, ...plans];
    new_state.sort(CropPlan.compare);
    return new_state;
  }

  const new_state = [created_plan, ...state];
  new_state.sort(CropPlan.compare);
  return new_state;
}

function deletePlan(deleted_plan, state) {
  return state.filter(plan => !CropPlan.equal(plan, deleted_plan));
}

export { createCropPlanAction, deleteCropPlanAction, cropPlanReducer };
