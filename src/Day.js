import React from "react";
import styled from "styled-components";
import EventDisplay from "./EventDisplay";
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

export default class Day extends React.PureComponent {
  handleClick = event => {
    this.props.selectDate(this.props.day_in_year);
  };

  render() {
    const actions = this.props.actions.map(action => (
      <StyledEvent key={action.id}>
        <EventDisplay event={action} />
      </StyledEvent>
    ));

    return (
      <StyledDay selected={this.props.selected} onClick={this.handleClick}>
        <StyledDayTitle>{this.props.day_in_month}</StyledDayTitle>
        <StyledEvents>{actions}</StyledEvents>
      </StyledDay>
    );
  }
}
