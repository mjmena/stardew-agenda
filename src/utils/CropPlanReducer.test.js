import {
  createCropPlanAction,
  deleteCropPlanAction,
  cropPlanReducer
} from "./useCropPlanReducer";

import CropPlan from "./CropPlan";
import crops from "../data/crops";
import fertilizers from "../data/fertilizers";

const jazz = crops[4];
const cauliflower = crops[7];
const none = fertilizers[0];

const cauliflower_plan = new CropPlan({
  date: 1,
  crop: cauliflower,
  fertilizer: none,
  quantity: 1,
  replant: true
});

const jazz_plan = new CropPlan({
  date: 1,
  crop: jazz,
  fertilizer: none,
  quantity: 1,
  replant: false
});

const merged_jazz_plan = new CropPlan({
  date: 1,
  crop: jazz,
  fertilizer: none,
  quantity: 2,
  replant: false
});

describe("Tests CropPlanReducer", () => {
  test("adding a new CropPlan to new state", () => {
    const new_state = cropPlanReducer([], createCropPlanAction(jazz_plan));
    expect(new_state).toEqual([jazz_plan]);
    expect(new_state.length).toBe(1);
  });

  test("merging a new CropPlan to old state", () => {
    const new_state = cropPlanReducer(
      [cauliflower_plan, jazz_plan],
      createCropPlanAction(jazz_plan)
    );
    expect(CropPlan.equal(new_state[0], [merged_jazz_plan][0])).toBe(true);
    expect(new_state).toContain(cauliflower_plan);
    expect(new_state).not.toContain(jazz_plan);
    expect(new_state.length).toBe(2);
  });

  test("adding a new CropPlan to old state", () => {
    const state = cropPlanReducer(
      [jazz_plan],
      createCropPlanAction(cauliflower_plan)
    );
    expect(state).toContain(jazz_plan);
    expect(state).toContain(cauliflower_plan);
    expect(state.length).toBe(2);
  });

  test("removing a CropPlan and return an empty state", () => {
    const state = cropPlanReducer([jazz_plan], deleteCropPlanAction(jazz_plan));
    expect(state).toEqual([]);
    expect(state).not.toContain(jazz_plan);
  });

  test("removing a CropPlan and return a state", () => {
    const state = cropPlanReducer(
      [jazz_plan, cauliflower_plan],
      deleteCropPlanAction(jazz_plan)
    );
    expect(state).toContain(cauliflower_plan);
    expect(state).not.toContain(jazz_plan);
    expect(state.length).toBe(1);
  });
});
