import React from "react";
import CreateCropEventForm from "./event/CreateCropEventForm";
import UpdateCropEventForm from "./event/UpdateCropEventForm";

export default class EventEditor extends React.Component {
  render() {
    const editable_events = this.props.events
      .filter(event => event.type === "plant" || event.type === "replant")
      .map(event => (
        <UpdateCropEventForm
          key={event.id}
          event={event}
          updateCropEvent={this.props.updateCropEvent}
        />
      ));

    return (
      <>
        <CreateCropEventForm
          crops={this.props.crops}
          date={this.props.date}
          createCropEvent={this.props.createCropEvent}
        />
        {editable_events}
      </>
    );
  }
}
