import React from "react";
import debounce from "lodash/debounce";
import { Row, Cell } from "./Table";

import CropImage from "../../components/CropImage";

export default class UpdateCropEventForm extends React.Component {
  state = {
    quantity: this.props.event.quantity,
    price: this.props.event.quantity * this.props.event.crop.buy,
    replant: this.props.event.type === "replant"
  };

  updatePrice = event => {
    const price = Number.parseInt(event.target.value, 10);
    const calculated_price = price - (price % this.props.event.crop.buy);
    this.setState({
      price,
      calculated_price,
      quantity: calculated_price / this.props.event.crop.buy
    });
    this.clampPrice();
  };

  updateQuantity = event => {
    const quantity = Number.parseInt(event.target.value, 10);
    this.setState({
      quantity,
      price: quantity * this.props.event.crop.buy
    });
  };

  clampPrice = debounce(() => {
    this.setState(state => ({ price: state.calculated_price }));
  }, 1000);

  toggleReplant = event => {
    this.setState(state => ({ replant: !state.replant }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleUpdateCropEvent(
      this.props.event,
      this.state.quantity,
      this.state.replant
    );
  };

  render() {
    const { event } = this.props;
    return (
      <Row onSubmit={this.handleSubmit}>
        <Cell>
          <CropImage crop={event.crop} />
          {event.crop.name}
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
            value={this.state.price}
            onChange={this.updatePrice}
          />
        </Cell>
        <Cell>
          {!event.crop.regrowth && (
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
