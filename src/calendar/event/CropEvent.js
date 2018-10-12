import range from "lodash/range";

export default class CropEvent {
  constructor({ date, crop, fertilizer, quantity, type = "plant", replant }) {
    Object.assign(this, { date, crop, fertilizer, quantity, type, replant });
  }

  get id() {
    return `${this.type}-${this.crop.id}-${this.fertilizer.id}`;
  }

  shouldReplant() {
    return this.replant;
  }

  doesRegrow() {
    return this.crop.regrowth;
  }

  isReplant() {
    return this.type === "replant";
  }

  getHarvestEvents = () => {
    const crop = this.crop;
    if (this.doesRegrow())
      return range(this.date + crop.growth, crop.end + 1, crop.regrowth).map(
        this.getHarvestEvent
      );
    return [this.getHarvestEvent(this.date + crop.growth)];
  };

  getHarvestEvent = date => new CropEvent({ ...this, date, type: "harvest" });

  getReplantEvents = () => {
    const crop = this.crop;
    return range(
      this.date + crop.growth,
      crop.end - crop.growth + 1,
      crop.growth
    ).map(this.getReplantEvent);
  };

  getReplantEvent = date => new CropEvent({ ...this, date, type: "replant" });
}
