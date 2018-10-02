import React from "react";
import styled from "styled-components";
import memoize from "memoize-one";
import EventDisplay from "./event/EventDisplay";
let StyledDay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${props => (props.selected ? "blue" : "none")};
`;

const StyledDayTitle = styled.div`
  height: 35px;
`;

const StyledEvents = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: start;
  overflow: auto;
`;

const StyledEvent = styled.div`
  flex: 1;
`;

export default class Day extends React.Component {
  getEditableEvents = memoize(events =>
    events.filter(event => event.type === "plant" || event.type === "replant")
  );

  handleClick = event => {
    this.props.selectDate(this.props.date);
  };

  render() {
    const [special_event, ...crop_events] = this.props.events;

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
    console.log(this.props.selected);

    return (
      <StyledDay selected={this.props.selected} onClick={this.handleClick}>
        <StyledDayTitle>
          {this.props.day} {title}
        </StyledDayTitle>
        <StyledEvents>{events}</StyledEvents>
      </StyledDay>
    );
  }
}
