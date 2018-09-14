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
        {this.props.date}
        {events
          ? this.props.events.map(event => <div>{event.name}</div>)
          : null}
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
          ariaHideApp={false}
        >
          <Event crops={this.props.crops} addEvent={this.props.addEvent} />
        </Modal>
      </Date>
    );
  }
}
