import React from "react";
import PropTypes from "prop-types";
import produce from "immer";
import data from "./../data/data";
import CropSelect from "./event/CropSelect";

export default class Event extends React.Component {
  state = {
    crops: data.crops,
    crop: null
  };

  componentDidMount() {
    this.setState({ crop: this.props.crops[0] });
  }

  handleChangeCrop = crop => {
    this.setState({ crop });
  };

  plantCrop = (crop, date) => {
    this.props.addEvent(
      produce(crop, draft => {
        draft.name = "Plant " + draft.name;
        draft.type = "plant";
      }),
      date
    );
    this.harvestCrop(crop, date + crop.growth);
  };

  harvestCrop = (crop, date) => {
    this.props.addEvent(
      produce(crop, draft => {
        draft.name = "Harvest " + draft.name;
        draft.type = "harvest";
      }),
      date
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const crop = this.state.crop;
    let date = this.props.date;
    this.plantCrop(this.state.crop, date);
    date += crop.growth;
    if (crop.regrowth) {
      date += crop.regrowth;
      while (date < crop.end) {
        this.harvestCrop(crop, date);
        date += crop.regrowth;
      }
    } else {
      while (date < crop.end && date + crop.growth < crop.end) {
        this.plantCrop(crop, date);
        date += crop.growth;
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CropSelect
          crops={this.props.crops}
          currentCrop={this.state.crop}
          changeCrop={this.handleChangeCrop}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Event.propTypes = {
  addEvent: PropTypes.func.isRequired
};
