const fs = require("fs");
const data = require("./data");

data.crops.forEach(crop => {
  crop.growth = crop.stages.reduce((total, stage) => total + stage, 0);
  delete crop.stages;
  delete crop.scythe;
  delete crop.index;
  if (crop.regrow) {
    crop.regrowth = crop.regrow;
    delete crop.regrow;
  }
  delete crop.note;
  delete crop.trellis;

  const start = crop.seasons.shift();
  let end = crop.seasons.pop();
  if (!end) end = start;
  if (start === "spring") crop.start = 1;
  else if (start === "summer") crop.start = 28 + 1;
  else if (start === "fall") crop.start = 28 * 2 + 1;

  if (end === "spring") crop.end = 28;
  else if (end === "summer") crop.end = 28 * 2;
  else if (end === "fall") crop.end = 28 * 3;
  delete crop.seasons;
});

const events = Object.assign({}, data.events.Spring);
Object.entries(data.events.Summer).forEach(
  ([key, value]) => (events[Number.parseInt(key) + 28] = value)
);
Object.entries(data.events.Fall).forEach(
  ([key, value]) => (events[Number.parseInt(key) + 28 * 2] = value)
);
Object.entries(data.events.Winter).forEach(
  ([key, value]) => (events[Number.parseInt(key) + 28 * 3] = value)
);

Object.keys(events).forEach(key => {
  events[key].forEach((event, index) => {
    if (event.festival || event.type) event.type = "festival";
    else event.type = "birthday";
    event.id = event.name
      .toLowerCase()
      .trim()
      .replace(/\s/g, "_");
    delete event.festival;
    delete event.day;
  });
});

fs.writeFileSync("./crops.json", JSON.stringify(data.crops, null, 2), "utf-8");
fs.writeFileSync("./events.json", JSON.stringify(events, null, 2), "utf-8");
