import React from "react";
import styled from "styled-components";
import CreateCropEventForm from "./event/CreateCropEventForm";
import UpdateCropEventForm from "./event/UpdateCropEventForm";

export default class EventEditor extends React.Component {
  render() {
    const editable_events = this.props.events
      .filter(event => event.type === "plant")
      .map(event => (
        <UpdateCropEventForm
          key={event.id + event.quantity}
          event={event}
          updateCropEvent={this.props.updateCropEvent}
          deleteCropEvent={this.props.deleteCropEvent}
        />
      ));

    return (
      <StyledEditor>
        <CreateCropEventForm
          crops={this.props.crops}
          date={this.props.date}
          createCropEvent={this.props.createCropEvent}
        />
        {editable_events}
      </StyledEditor>
    );
  }
}

const StyledEditor = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;
