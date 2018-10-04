import React from "react";

export default class FertilizerRadio extends React.Component {
  render() {
    return FertilizerRadio.fertilizer.map(fertilizer => (
      <input
        type="radio"
        id={fertilizer.id}
        name={fertilizer.id}
        value={fertilizer.id}
      />
    ));
  }

  static fertilizer = [
    {
      buy: 0,
      id: "none",
      name: "None"
    },
    {
      buy: 100,
      id: "basic_fertilizer",
      name: "Basic Fertilizer"
    },
    {
      buy: 150,
      id: "quality_fertilizer",
      name: "Quality Fertilizer"
    },
    {
      buy: 100,
      growth_rate: 0.1,
      id: "speed_gro",
      name: "Speed-Gro"
    },
    {
      buy: 150,
      growth_rate: 0.25,
      id: "delux_speed_gro",
      name: "Delux Speed-Gro"
    }
  ];
}
