import CropPlan from "./CropPlan";
import crops from "../data/crops";
import fertilizers from "../data/fertilizers";

const none = fertilizers[0];
const kale = crops[13];
const green_bean = crops[15];
export const replant_plan = new CropPlan({
  start_date: 0,
  crop: kale,
  fertilizer: none,
  quantity: 12,
  replant: true
});

export const regrowth_plan = new CropPlan({
  start_date: 0,
  crop: green_bean,
  fertilizer: none,
  quantity: 7
});
