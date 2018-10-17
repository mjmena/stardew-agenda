import range from "lodash/range";
import CropPlan from "./CropPlan";
import crops from "../data/crops";
import fertilizers from "../data/fertilizers";

const jazz = crops[4];

const none = fertilizers[0];
const jazz_plan = new CropPlan({
  date: 0,
  crop: jazz,
  fertilizer: none,
  quantity: 1,
  replant: false
});

describe("Tests for simple CropPlan", () => {
  test("create a CropPlan", () => {
    expect(JSON.stringify(jazz_plan, null, 2)).toMatchSnapshot();
  });
  test("check getCropGrowth", () => {
    expect(CropPlan.getCropGrowth(jazz, none)).toBe(jazz.growth);
  });
  test("Is a plant date?", () => {
    expect(jazz_plan.isPlantDate(0)).toBe(true);
  });

  test("Is not a plant date?", () => {
    expect(jazz_plan.isPlantDate(1)).toBe(false);
  });

  test("Is a harvest date?", () => {
    expect(jazz_plan.isHarvestDate(jazz.growth)).toBe(true);
  });

  test("Is not a harvest date?", () => {
    expect(jazz_plan.isHarvestDate(0)).toBe(false);
  });
  test("get plant action", () => {
    expect(jazz_plan.getCropActionsOnDate(0)).toMatchSnapshot();
  });
  test("get harvest action", () => {
    expect(jazz_plan.getCropActionsOnDate(jazz.growth)).toMatchSnapshot();
  });
  test("get actions for month", () => {
    const actions = range(0, 28).map(jazz_plan.getCropActionsOnDate);
    expect(actions).toMatchSnapshot();
  });
});

const cauliflower = crops[7];
const cauliflower_start_date = 1;
const cauliflower_plan = new CropPlan({
  date: cauliflower_start_date,
  crop: cauliflower,
  fertilizer: none,
  quantity: 1,
  replant: true
});

describe("Tests for CropPlan with replant", () => {
  test("create a CropPlan", () => {
    expect(JSON.stringify(cauliflower_plan, null, 2)).toMatchSnapshot();
  });

  test("check getCropGrowth", () => {
    expect(CropPlan.getCropGrowth(cauliflower, none)).toBe(cauliflower.growth);
  });

  test("Is a plant date?", () => {
    expect(cauliflower_plan.isPlantDate(cauliflower_start_date)).toBe(true);
  });

  test("Is not a plant date?", () => {
    expect(cauliflower_plan.isPlantDate(cauliflower_start_date + 1)).toBe(
      false
    );
  });

  test("Is a harvest date?", () => {
    expect(
      cauliflower_plan.isHarvestDate(
        cauliflower_start_date + cauliflower.growth
      )
    ).toBe(true);
  });

  test("Is not a harvest date?", () => {
    expect(cauliflower_plan.isHarvestDate(0)).toBe(false);
  });

  test("get plant action", () => {
    expect(
      cauliflower_plan.getCropActionsOnDate(cauliflower_start_date)
    ).toMatchSnapshot();
  });

  test("get plant and harvest action", () => {
    expect(
      cauliflower_plan.getCropActionsOnDate(
        cauliflower_start_date + cauliflower.growth
      )
    ).toMatchSnapshot();
  });

  test("get harvest action", () => {
    expect(
      cauliflower_plan.getCropActionsOnDate(
        cauliflower_start_date + cauliflower.growth
      )
    ).toMatchSnapshot();
  });

  test("get actions for month", () => {
    expect(
      range(0, 28).map(cauliflower_plan.getCropActionsOnDate)
    ).toMatchSnapshot();
  });
});

const fruit = crops[1];
const fruit_start_date = 0;
const fruit_plan = new CropPlan({
  date: fruit_start_date,
  crop: fruit,
  fertilizer: none,
  quantity: 1,
  replant: true
});

describe("Tests for CropPlan with regrowth", () => {
  test("create a CropPlan", () => {
    expect(JSON.stringify(fruit_plan, null, 2)).toMatchSnapshot();
  });

  test("check getCropGrowth", () => {
    expect(CropPlan.getCropGrowth(fruit, none)).toBe(fruit.growth);
  });

  test("Is a plant date?", () => {
    expect(fruit_plan.isPlantDate(fruit_start_date)).toBe(true);
  });

  test("Is not a plant date?", () => {
    expect(fruit_plan.isPlantDate(fruit_start_date + 1)).toBe(false);
  });

  test("Is a harvest date?", () => {
    expect(fruit_plan.isHarvestDate(fruit_start_date + fruit.growth)).toBe(
      true
    );
  });

  test("Is not a harvest date?", () => {
    expect(fruit_plan.isHarvestDate(0)).toBe(false);
  });

  test("get plant action", () => {
    expect(fruit_plan.getCropActionsOnDate(fruit_start_date)).toMatchSnapshot();
  });

  test("get harvest action", () => {
    expect(
      fruit_plan.getCropActionsOnDate(fruit_start_date + fruit.growth)
    ).toMatchSnapshot();
  });

  test("get actions for year", () => {
    const actions = range(0, 127).map(fruit_plan.getCropActionsOnDate);
    expect(actions).toMatchSnapshot();
  });
});
