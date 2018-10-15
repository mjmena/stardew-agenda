import React from "react";
import range from "lodash/range";
import {
  createCropEventAction,
  deleteCropEventAction,
  cropEventReducer
} from "../utils/CropEventReducer";

import events from "../data/events.json";

export default class EventProvider extends React.Component {
  state = {
    events: range(128).map(date => (events[date] ? events[date] : []))
  };

  createCropEvent = event => {
    this.setState(state => ({
      events: cropEventReducer(state.events, createCropEventAction(event))
    }));
  };

  deleteCropEvent = event => {
    this.setState(state => ({
      events: cropEventReducer(state.events, deleteCropEventAction(event))
    }));
  };

  updateCropEvent = (old_event, new_event) => {
    this.deleteCropEvent(old_event);
    this.createCropEvent(new_event);
  };

  render = () =>
    this.props.children(
      this.state.events,
      this.createCropEvent,
      this.updateCropEvent,
      this.deleteCropEvent
    );
}
