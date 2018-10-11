import React from "react";
import styled from "styled-components";
import CropEvent from "./CropEvent";
import CropEventDetailsFragment from "./form/CropEventDetailsFragment";
import CropImage from "../../components/CropImage";
export default class UpdateCropEventForm extends React.Component {
  state = {
    quantity: this.props.event.quantity,
    price: this.props.event.quantity * this.props.event.crop.buy,
    replant: this.props.event.shouldReplant(),
    fertilizer: this.props.event.fertilizer
  };

  setDetails = details => {
    this.setState(details);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { quantity, replant, fertilizer } = this.state;
    this.props.updateCropEvent(
      this.props.event,
      new CropEvent({
        date: this.props.event.date,
        crop: this.props.event.crop,
        quantity,
        replant,
        fertilizer
      })
    );
  };

  handleDeleteClick = event => {
    event.preventDefault();
    this.props.deleteCropEvent(this.props.event);
  };

  render() {
    return (
      <>
        <CropImage crop={this.props.event.crop} />

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
            <button onClick={this.handleDeleteClick}>Remove</button>
          </StyledSecondaryInput>
        </StyledForm>
      </>
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
