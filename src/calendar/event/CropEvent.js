export default class CropEvent {
  constructor({ date, crop, fertilizer, quantity, type = "plant", replant }) {
    Object.assign(this, { date, crop, fertilizer, quantity, type, replant });
    console.log(type);
  }

  get id() {
    return `${this.type}-${this.crop.id}-${this.fertilizer.id}`;
  }

  shouldReplant() {
    return this.replant;
  }

  harvest = date => {
    return new CropEvent(Object.assign(this, { date, type: "harvest" }));
  };
}
