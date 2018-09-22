import React from "react";
import debounce from "lodash/debounce";
import produce from "immer";
import { Row, Cell } from "./Table";

export default class EditCrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: "",
      live_price: "",
      replant: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    const crop = props.crop;

    if (crop.quantity && crop.quantity !== state.quantity) {
      return {
        live_price: crop.quantity * crop.buy,
        quantity: crop.quantity,
        replant: crop.replant
      };
    } else return state;
  }

  updatePrice = event => {
    const live_price = event.target.value;
    const price = live_price - (live_price % this.props.crop.buy);
    this.setState({
      live_price,
      price,
      quantity: price / this.props.crop.buy
    });
    this.clampPrice();
  };

  updateQuantity = event => {
    this.setState({
      quantity: Number.parseInt(event.target.value, 10),
      price: event.target.value * this.props.crop.buy,
      live_price: event.target.value * this.props.crop.buy
    });
  };

  clampPrice = debounce(() => {
    this.setState(state => ({ live_price: state.price }));
  }, 1000);

  toggleReplant = event => {
    this.setState(state => ({ replant: !state.replant }));
  };

  render() {
    return (
      <Row
        onSubmit={event => {
          event.preventDefault();
          this.props.handleEdit(
            produce(this.props.crop, draft => {
              draft.quantity = this.state.quantity;
              draft.replant = this.state.replant;
            })
          );
        }}
      >
        <Cell>{this.props.crop.name}</Cell>
        <Cell>
          <input
            placeholder="Price"
            type="text"
            name="price"
            value={this.state.live_price}
            onChange={this.updatePrice}
          />
        </Cell>
        <Cell>
          <input
            placeholder="Quantity"
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.updateQuantity}
          />
        </Cell>
        <Cell>
          {!this.props.crop.regrowth && (
            <input
              type="checkbox"
              name="replant"
              value={this.state.replant}
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
