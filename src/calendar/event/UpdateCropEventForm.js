import React from "react";
import styled from "styled-components";
import CropEventDetailsFragment from "./form/CropEventDetailsFragment";

export default class UpdateCropEventForm extends React.Component {
  state = {
    quantity: this.props.event.quantity,
    price: this.props.event.quantity * this.props.event.crop.buy,
    replant: this.props.event.type === "replant",
    fertilizer: this.props.event.fertilizer
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleCropEventSubmit(
      this.props.event,
      this.state.quantity,
      this.state.replant,
      this.state.fertilizer
    );
  };

  setDetails = details => {
    this.setState(details);
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <CropEventDetailsFragment
          crop={this.props.event.crop}
          quantity={this.state.quantity}
          price={this.state.price}
          replant={this.state.replant}
          fertilizer={this.state.fertilizer}
          setDetails={this.setDetails}
          wrapper={StyledSecondaryInput}
        />

        <StyledSecondaryInput>
          <button>Submit</button>
        </StyledSecondaryInput>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  display: flex
  flex-flow: row nowrap
`;

const StyledSecondaryInput = styled.div`
  flex: 1;
`;
