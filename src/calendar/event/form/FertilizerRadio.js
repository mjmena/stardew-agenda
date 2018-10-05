import React from "react";
import fertilizers from "../../../data/fertilizers";
export default class FertilizerRadio extends React.Component {
  handleChange = event => {
    const fertilizer = fertilizers[event.target.value];
    this.props.updateFertilizer(fertilizer);
  };

  render() {
    return fertilizers.map((fertilizer, index) => (
      <React.Fragment key={fertilizer.id}>
        <input
          type="radio"
          id={fertilizer.id}
          name={fertilizer.id}
          value={index}
          checked={this.props.fertilizer.id === fertilizer.id}
          onChange={this.handleChange}
        />
        <label htmlFor={fertilizer.id}>{fertilizer.name}</label>
      </React.Fragment>
    ));
  }
}
