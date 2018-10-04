import React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import CropSelect from "./form/CropSelect";

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

export default class CreateCropEventForm extends React.Component {
  state = {
    crop: null,
    quantity: 0,
    price: 0,
    replant: false
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

  handleQuantityChange = event => {
    const quantity = Number.parseInt(event.target.value, 10);
    this.setState({ quantity, price: quantity * this.state.crop.buy });
  };

  handlePriceChange = event => {
    const price = Number.parseInt(event.target.value, 10);
    this.setState({ price, quantity: Math.floor(price / this.state.crop.buy) });
    this.nomalizePriceChange();
  };

  nomalizePriceChange = debounce(
    () => this.setState(state => ({ price: state.quantity * state.crop.buy })),
    1000
  );

  handleReplantChange = event => {
    const replant = event.target.checked;
    this.setState({ replant });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleCreateCropEvent(
      this.state.crop,
      this.state.quantity,
      this.state.replant
    );
    this.setState(this.reset_state);
  };

  render() {
    const crop_select = (
      <CropSelect
        crop={this.state.crop}
        crops={this.props.crops}
        onChange={this.handleCropChange}
      />
    );
    if (!this.state.crop) {
      return crop_select;
    }

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledPrimaryInput>{crop_select}</StyledPrimaryInput>
        <StyledSecondaryInput>
          <input
            type="text"
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
          />
        </StyledSecondaryInput>
        <StyledSecondaryInput>
          <input
            type="text"
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
        </StyledSecondaryInput>
        <StyledSecondaryInput>
          <input
            type="checkbox"
            checked={this.state.replant}
            onChange={this.handleReplantChange}
          />
        </StyledSecondaryInput>
        <StyledSecondaryInput>
          <input type="submit" value="submit" />
        </StyledSecondaryInput>
      </StyledForm>
    );
  }
}
