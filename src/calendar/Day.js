import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import memoize from "memoize-one";
import EventEditor from "./EventEditor";
import EventDisplay from "./event/EventDisplay";
let StyledDay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const StyledDayTitle = styled.div`
  height: 35px;
  font-size 15px 
`;

const StyledEvents = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: start;
  overflow: scroll;
`;

const StyledEvent = styled.div`
  flex: 1;
`;

export default class Day extends React.Component {
  static defaultProps = {
    events: []
  };
  state = {
    isOpen: false
  };

  handleClick = event => {
    this.setState({ isOpen: true });
  };

  handleClose = event => {
    this.setState({ isOpen: false });
  };

  getEditableEvents = memoize(events =>
    events.filter(event => event.type === "plant" || event.type === "replant")
  );

  render() {
    const [special_event, ...crop_events] = this.props.events;
    const editable_events = this.getEditableEvents(this.props.events);

    const title =
      special_event &&
      (special_event.type === "festival" ||
        special_event.type === "birthday") ? (
        <EventDisplay event={special_event} />
      ) : null;

    const events = (title ? crop_events : this.props.events).map(event => (
      <StyledEvent key={event.id}>
        <EventDisplay event={event} />
      </StyledEvent>
    ));

    return (
      <StyledDay onClick={this.handleClick}>
        <StyledDayTitle>
          {this.props.date % 28} {title}
        </StyledDayTitle>
        <StyledEvents>{events}</StyledEvents>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
          ariaHideApp={false}
        >
          <EventEditor {...this.props} events={editable_events} />
        </Modal>
      </StyledDay>
    );
  }
}
