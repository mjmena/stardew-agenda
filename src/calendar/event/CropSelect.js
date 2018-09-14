import React from "react";

export default class CropSelect extends React.Component {
  handleChangeCrop = event => {
    this.props.changeCrop(event.target.value);
  };

  render() {
    return (
      <select value={this.props.crop} onChange={this.handleChangeCrop}>
        {this.props.crops.map(crop => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>
    );
  }
}
