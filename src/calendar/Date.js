import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

import Event from "./Event";
let Date = styled.div`
  width:100%
  height:100%
`;

export default class Day extends React.Component {
  state = {
    isOpen: false
  };

  handleClick = event => {
    this.setState({ isOpen: true });
  };

  handleClose = event => {
    this.setState({ isOpen: false });
  };

  render() {
    let events = this.props.events;

    return (
      <Date onClick={this.handleClick}>
        {this.props.date % 28}
        {events &&
          this.props.events.map(event => {
            if (event.type === "plant")
              return <img src={`/images/seeds/${event.id}.png`} />;
            else if (event.type === "harvest")
              return <img src={`/images/crops/${event.id}.png`} />;
            else return <div key={event.name}> {event.name} </div>;
          })}
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
          ariaHideApp={false}
        >
          <Event
            date={this.props.date}
            crops={this.props.crops}
            addEvent={this.props.addEvent}
          />
        </Modal>
      </Date>
    );
  }
}
