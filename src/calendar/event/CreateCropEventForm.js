import React from "react";
import debounce from "lodash/debounce";
import { Row, Cell } from "./Table";
import CropImage from "../../components/CropImage";

export default class CreateCropEventForm extends React.Component {
  reset_state = {
    quantity: 0,
    price: 0,
    calculated_price: 0,
    replant: false
  };
  state = this.reset_state;

  updatePrice = event => {
    const value = Number.parseInt(event.target.value, 10);
    const price = value > 0 ? value : 0;
    const calculated_price = price - (price % this.props.crop.buy);
    this.setState({
      price,
      calculated_price,
      quantity: calculated_price / this.props.crop.buy
    });
    this.clampPrice();
  };

  updateQuantity = event => {
    const value = Number.parseInt(event.target.value, 10);
    const quantity = value > 0 ? value : 0;
    this.setState({
      quantity,
      price: quantity * this.props.crop.buy
    });
  };

  clampPrice = debounce(() => {
    this.setState(state => ({ price: state.calculated_price }));
  }, 1000);

  toggleReplant = event => {
    this.setState(state => ({ replant: !state.replant }));
  };

  render() {
    return (
      <Row
        onSubmit={event => {
          event.preventDefault();
          this.props.handleCreateCropEvent(
            this.props.crop,
            this.state.quantity,
            this.state.replant
          );
          this.setState(this.reset_state);
        }}
      >
        <Cell>
          <CropImage crop={this.props.crop} />
          {this.props.crop.name}
        </Cell>
        <Cell>
          <input
            placeholder="Quantity"
            type="text"
            name="quantity"
            value={this.state.quantity !== 0 ? this.state.quantity : ""}
            onChange={this.updateQuantity}
          />
        </Cell>
        <Cell>
          <input
            placeholder="Price"
            type="text"
            name="price"
            value={this.state.price !== 0 ? this.state.price : ""}
            onChange={this.updatePrice}
          />
        </Cell>

        <Cell>
          {!this.props.crop.regrowth && (
            <input
              type="checkbox"
              name="replant"
              checked={this.state.replant}
              onChange={this.toggleReplant}
            />
          )}
        </Cell>
        <Cell>
          <input type="submit" value="Submit" />
        </Cell>
      </Row>
    );
  }
}
