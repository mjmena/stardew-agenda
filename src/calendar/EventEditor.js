import React from "react";
import range from "lodash/range";
import styled from "styled-components";
import CreateCropEventForm from "./event/CreateCropEventForm";
import UpdateCropEventForm from "./event/UpdateCropEventForm";

export default class Event extends React.Component {
  createPlantCropEvent = (date, crop, quantity, replant) => ({
    date,
    crop,
    quantity,
    type: !replant ? "plant" : "replant",
    id: `${!replant ? "plant" : "replant"}-${crop.id}`
  });

  createHarvestCropEvent = (date, crop, quantity) => ({
    date,
    crop,
    quantity,
    type: "harvest",
    id: `harvest-${crop.id}`
  });

  extrapolateCropEventDates = (date, crop, replant) => {
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

  handleCreateCropEvent = (crop, quantity, replant) => {
    const dates = this.extrapolateCropEventDates(
      this.props.date,
      crop,
      replant
    );

    this.props.createEvents(
      dates.plant.map(date =>
        this.createPlantCropEvent(date, crop, quantity, replant)
      )
    );

    this.props.createEvents(
      dates.harvest.map(date =>
        this.createHarvestCropEvent(date, crop, quantity)
      )
    );
  };

  handleUpdateCropEvent = (event, quantity, replant) => {
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
          this.createPlantCropEvent(date, event.crop, quantity, replant)
        )
      );
      this.props.createEvents(
        dates.harvest.map(date =>
          this.createHarvestCropEvent(
            date,
            event.crop,
            quantity - event.quantity
          )
        )
      );
    } else {
      this.handleCreateCropEvent(event.crop, quantity, replant);
      this.handleRemoveCropEvent(event, !replant);
    }
  };

  handleRemoveCropEvent = (event, replant) => {
    const dates = this.extrapolateCropEventDates(
      this.props.date,
      event.crop,
      replant
    );

    this.props.removeEvents(
      dates.plant.map(date =>
        this.createPlantCropEvent(date, event.crop, event.quantity, replant)
      )
    );

    this.props.removeEvents(
      dates.harvest.map(date =>
        this.createHarvestCropEvent(date, event.crop, event.quantity, replant)
      )
    );
  };

  render() {
    const updateable_events = this.props.events
      .filter(event => event.type === "plant" || event.type === "replant")
      .map(event => (
        <UpdateCropEventForm
          key={event.id}
          {...event}
          handleUpdateCropEvent={this.handleUpdateCropEvent}
        />
      ));

    return (
      <StyledUpdateCropEvent>
        <div>Crops</div>
        <CreateCropEventForm
          crops={this.props.crops}
          handleCreateCropEvent={this.handleCreateCropEvent}
        />
        <div>Events</div>
        {updateable_events}
      </StyledUpdateCropEvent>
    );
  }
}

Event.defaultProps = {
  events: []
};

const StyledUpdateCropEvent = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
`;
