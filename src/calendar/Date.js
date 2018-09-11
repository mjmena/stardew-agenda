import React from "react";
import styled from "styled-components";

let DayLayout = styled.div`
  width:100%
  height:100%
`;
export default class Day extends React.Component {
  handleClick = event => {
    this.props.addEvent({ name: "clicked" });
  };

  render() {
    let events = this.props.events;

    return (
      <DayLayout onClick={this.handleClick}>
        <span>{this.props.date}</span>
        <div>{events ? this.props.events.map(event => event.name) : null}</div>
      </DayLayout>
    );
  }
}
