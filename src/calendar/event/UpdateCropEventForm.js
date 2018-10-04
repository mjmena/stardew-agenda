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
    replant: this.props.type === "replant"
  };

  updatePrice = price => {
    if (price) {
      this.setState({
        price,
        quantity: Math.floor(price / this.props.crop.buy)
      });
      this.clampPrice();
    } else this.setState({ price, quantity: null });
  };

  updateQuantity = quantity => {
    if (quantity)
      this.setState({
        quantity,
        price: quantity * this.props.crop.buy
      });
    else this.setState({ quantity, price: null });
  };

  clampPrice = debounce(() => {
    if (this.state.price)
      this.setState(state => ({
        price: state.quantity * this.props.crop.buy
      }));
  }, 1000);

  toggleReplant = event => {
    this.setState(state => ({ replant: !state.replant }));
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
    const { crop } = this.props;
    return (
      <Row onSubmit={this.handleSubmit}>
        <Cell>
          <CropImage crop={crop} />
          {crop.name}
        </Cell>
        <Cell>
          <NumberInput
            value={this.state.quantity}
            handleChange={this.updateQuantity}
          />
        </Cell>
        <Cell>
          <NumberInput
            value={this.state.price}
            handleChange={this.updatePrice}
          />
        </Cell>
        <Cell>
          {!crop.regrowth && (
            <input
              type="checkbox"
              name="replant"
              checked={this.state.replant}
              onChange={this.toggleReplant}
            />
          )}
        </Cell>
        <Cell>
          <FertilizerRadio />
        </Cell>
        <Cell>
          <input type="submit" value="Submit" />
        </Cell>
      </Row>
    );
  }
}
