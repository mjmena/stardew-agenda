import React from "react";
import debounce from "lodash/debounce";
import NumberInput from "./NumberInput";
import FertilizerRadio from "./FertilizerRadio";
import styled from "styled-components";
export default class CropEventDetailsFragment extends React.Component {
  updatePrice = price => {
    if (price) {
      this.props.setDetails({
        price,
        quantity: Math.floor(price / this.props.crop.buy)
      });
      this.clampPrice();
    } else this.props.setDetails({ price, quantity: null });
  };

  updateQuantity = quantity => {
    if (quantity)
      this.props.setDetails({
        quantity,
        price: quantity * this.props.crop.buy
      });
    else this.props.setDetails({ quantity, price: null });
  };

  clampPrice = debounce(() => {
    if (this.props.price)
      this.props.setDetails({
        price: this.props.quantity * this.props.crop.buy
      });
  }, 1000);

  toggleReplant = event => {
    this.props.setDetails({ replant: !this.props.replant });
  };

  updateFertilizer = fertilizer => {
    this.props.setDetails({ fertilizer });
  };

  render() {
    return (
      <>
        <StyledInput>
          <NumberInput
            value={this.props.quantity}
            handleChange={this.updateQuantity}
          />
        </StyledInput>
        <StyledInput>
          <NumberInput
            value={this.props.price}
            handleChange={this.updatePrice}
          />
        </StyledInput>
        <StyledInput flex={2}>
          <FertilizerRadio
            fertilizer={this.props.fertilizer}
            updateFertilizer={this.updateFertilizer}
          />
        </StyledInput>
      </>
    );
  }
}

const StyledInput = styled.div`
    flex: ${props => (props.flex ? props.flex : 1)}
    padding: 0px 5px
  `;
