import React from "react";
import range from "lodash/range";
import CropEventForm from "./event/CropEventForm";
import UpdateCropEventForm from "./event/UpdateCropEventForm";

export default class Event extends React.Component {
  createPlantCropEvent = (date, crop, quantity, replant, fertilizer) => ({
    date,
    crop,
    quantity,
    fertilizer,
    type: !replant ? "plant" : "replant",
    id: `${!replant ? "plant" : "replant"}-${crop.id}`
  });

  createHarvestCropEvent = (date, crop, quantity, fertilizer) => ({
    date,
    crop,
    quantity,
    fertilizer,
    type: "harvest",
    id: `harvest-${crop.id}`
  });

  extrapolateCropEventDates = (date, crop, replant, fertilizer) => {
    const plant_dates = !replant
      ? [date]
      : range(date, crop.end - crop.growth + 1, crop.growth);
    const harvest_dates = plant_dates.map(
      plant_date => plant_date + crop.growth
    );

    if (crop.regrowth) {
      return {
        plant: plant_dates,
        harvest: harvest_dates.concat(
          range(date + crop.growth + crop.regrowth, crop.end + 1, crop.regrowth)
        )
      };
    } else {
      return { plant: plant_dates, harvest: harvest_dates };
    }
  };

  handleCreateCropEvent = (crop, quantity, replant, fertilizer) => {
    const dates = this.extrapolateCropEventDates(
      this.props.date,
      crop,
      replant,
      fertilizer
    );

    this.props.createEvents(
      dates.plant.map(date =>
        this.createPlantCropEvent(date, crop, quantity, replant, fertilizer)
      )
    );

    this.props.createEvents(
      dates.harvest.map(date =>
        this.createHarvestCropEvent(date, crop, quantity, fertilizer)
      )
    );
  };

  handleUpdateCropEvent = (event, quantity, replant, fertilizer) => {
    if (
      (!replant && event.type === "plant") ||
      (replant && event.type === "replant")
    ) {
      const dates = this.extrapolateCropEventDates(
        this.props.date,
        event.crop,
        replant
      );

      this.props.updateEvents(
        dates.plant.map(date =>
          this.createPlantCropEvent(
            date,
            event.crop,
            quantity,
            replant,
            fertilizer
          )
        )
      );
      this.props.createEvents(
        dates.harvest.map(date =>
          this.createHarvestCropEvent(
            date,
            event.crop,
            quantity - event.quantity,
            fertilizer
          )
        )
      );
    } else {
      this.handleCreateCropEvent(event.crop, quantity, replant, fertilizer);
      this.handleRemoveCropEvent(event, !replant);
    }
  };

  handleRemoveCropEvent = (event, replant) => {
    const dates = this.extrapolateCropEventDates(
      this.props.date,
      event.crop,
      replant,
      event.fertilizer
    );

    this.props.removeEvents(
      dates.plant.map(date =>
        this.createPlantCropEvent(
          date,
          event.crop,
          event.quantity,
          replant,
          event.fertilizer
        )
      )
    );

    this.props.removeEvents(
      dates.harvest.map(date =>
        this.createHarvestCropEvent(
          date,
          event.crop,
          event.quantity,
          replant,
          event.fertilizer
        )
      )
    );
  };

  render() {
    const editable_events = this.props.events
      .filter(event => event.type === "plant" || event.type === "replant")
      .map(event => (
        <UpdateCropEventForm
          key={event.id}
          event={event}
          handleCropEventSubmit={this.handleUpdateCropEvent}
        />
      ));

    return (
      <>
        <CropEventForm
          crops={this.props.crops}
          handleCropEventSubmit={this.handleCreateCropEvent}
        />
        {editable_events}
      </>
    );
  }
}

Event.defaultProps = {
  events: []
};
