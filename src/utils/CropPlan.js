import range from "lodash/range";

export default class CropPlan {
  constructor({ date, crop, fertilizer, quantity, replant }) {
    Object.assign(this, {
      crop,
      fertilizer,
      quantity,
      start_date: date,
      end_date: replant
        ? crop.end
        : date + CropPlan.getCropGrowth(crop, fertilizer)
    });
  }

  static getCropGrowth(crop, fertilizer) {
    return crop.growth;
  }

  get id() {
    return `${this.crop.id}-${this.fertilizer.id}`;
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
    type,
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
