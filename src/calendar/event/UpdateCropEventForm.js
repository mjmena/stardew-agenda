import React from "react";
import debounce from "lodash/debounce";
import { Row, Cell } from "./Table";
import NumberInput from "./form/NumberInput";
import FertilizerRadio from "./form/FertilizerRadio";
import CropImage from "../../components/CropImage";

export default class UpdateCropEventForm extends React.Component {
  state = {
    quantity: this.props.quantity,
    price: this.props.quantity * this.props.crop.buy,
    replant: this.props.type === "replant",
    fertilizer: this.props.fertilizer
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleUpdateCropEvent(
      this.props.crop,
      this.state.quantity,
      this.state.replant
    );
  };

  render() {
    const Wrapper = this.props.wrapper;
    return (
      <>
        <Wrapper>
          <NumberInput
            value={this.state.quantity}
            handleChange={this.updateQuantity}
          />
        </Wrapper>
        <Wrapper>
          <NumberInput
            value={this.state.price}
            handleChange={this.updatePrice}
          />
        </Wrapper>
        <Wrapper>
          {!crop.regrowth && (
            <input
              type="checkbox"
              name="replant"
              checked={this.state.replant}
              onChange={this.toggleReplant}
            />
          )}
        </Wrapper>
        <Wrapper>
          <FertilizerRadio />
        </Wrapper>
      </>
    );
  }
}
