import React from "react";
import styled from "styled-components";
import CropSelect from "./form/CropSelect";
import CropEventDetailsFragment from "./form/CropEventDetailsFragment";

export default class CreateCropEventForm extends React.Component {
  static defaultProps = {
    crop: null,
    quantity: null,
    price: null,
    replant: false,
    fertilizer: null
  };

  state = {
    crop: this.props.crop,
    quantity: this.props.quantity,
    price: this.props.quantity
      ? this.props.quantity * this.props.crop.buy
      : null,
    replant: this.props.replant,
    fertilizer: this.props.fertilizer
  };

  reset_state = this.state;

  handleCropChange = crop => {
    if (crop === this.state.crop) return;
    this.setState({
      crop: crop,
      quantity: 1,
      price: crop.buy,
      replant: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleCropEventSubmit(
      this.state.crop,
      this.state.quantity,
      this.state.replant
    );
  };
  setDetails = details => {
    this.setState(details);
  };

  render() {
    const details_fragment = this.state.crop ? (
      <CropEventDetailsFragment
        crop={this.state.crop}
        quantity={this.state.quantity}
        price={this.state.price}
        replant={this.state.replant}
        fertilizer={this.state.fertilizer}
        setDetails={this.setDetails}
        wrapper={StyledSecondaryInput}
      />
    ) : null;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledPrimaryInput>
          <CropSelect
            crop={this.state.crop}
            crops={this.props.crops}
            onChange={this.handleCropChange}
          />
        </StyledPrimaryInput>
        {details_fragment}
        <StyledSecondaryInput>
          <input type="submit" value="submit" />
        </StyledSecondaryInput>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  display: flex
  flex-flow: row nowrap
`;

const StyledPrimaryInput = styled.div`
  flex: 2;
`;

const StyledSecondaryInput = styled.div`
  flex: 1;
`;
