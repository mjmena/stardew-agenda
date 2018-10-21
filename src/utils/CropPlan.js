import range from "lodash/range";

export default class CropPlan {
  constructor({
    date,
    crop,
    fertilizer,
    quantity,
    replant,
    start_date,
    end_date
  }) {
    Object.assign(this, {
      crop,
      fertilizer,
      quantity,
      start_date: date !== undefined ? date : start_date,
      end_date: replant
        ? crop.end
        : end_date || date + CropPlan.getCropGrowth(crop, fertilizer)
    });
  }

  static getCropGrowth(crop, fertilizer) {
    return crop.growth;
  }

  static merge(planA, planB) {
    if (CropPlan.compare(planA, planB))
      throw "Plans must have equal dates, crop, and fertilizer to merge";
    const { quantity, ...same } = planA;
    return new CropPlan({ quantity: quantity + planB.quantity, ...same });
  }

  // Compares data that cannot be merged - i.e. dates, crop, and fertilizer
  static compare(planA, planB) {
    const start_date_compare = planA.start_date - planB.start_date;
    const crop_compare = planA.crop.id.localeCompare(planB.crop.id);
    const fertilizer_compare = planA.fertilizer.id.localeCompare(
      planB.fertilizer.id
    );
    const end_date_compare = planA.end_date - planB.end_date;

    if (start_date_compare > 0) return 1;
    else if (start_date_compare < 0) return -1;
    else if (crop_compare > 0) return 1;
    else if (crop_compare < 0) return -1;
    else if (fertilizer_compare > 0) return 1;
    else if (fertilizer_compare < 0) return -1;
    else if (end_date_compare > 0) return 1;
    else if (end_date_compare < 0) return -1;
    else return 0;
  }

  static equal(planA, planB) {
    const isSame = CropPlan.compare(planA, planB) === 0;
    return isSame && planA.quantity - planB.quantity === 0;
  }

  isPlantDate = date => {
    const growth = CropPlan.getCropGrowth(this.crop, this.fertilizer);
    const inPlan = this.start_date <= date && date + growth <= this.end_date;

    return (
      inPlan &&
      (this.crop.regrowth
        ? date === this.start_date
        : (date - this.start_date) % growth === 0)
    );
  };

  isHarvestDate = date => {
    const growth = CropPlan.getCropGrowth(this.crop, this.fertilizer);
    const inPlan = this.start_date <= date - growth && date <= this.end_date;

    return (
      inPlan &&
      (this.crop.regrowth
        ? date === this.start_date + growth ||
          (date - this.start_date + growth) % this.crop.regrowth === 0
        : (date - this.start_date + growth) % growth === 0)
    );
  };

  getAction = type => ({
    id: `${type}-${this.crop.id}`,
    crop: this.crop,
    quantity: this.quantity
  });

  getCropActionsOnDate = date => {
    const isPlant = this.isPlantDate(date);
    const isHarvest = this.isHarvestDate(date);
    if (isPlant && isHarvest) {
      return [this.getAction("plant"), this.getAction("harvest")];
    }

    if (isPlant) return [this.getAction("plant")];
    if (isHarvest) return [this.getAction("harvest")];
  };
}
