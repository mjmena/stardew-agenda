import React from "react";
import debounce from "lodash/debounce";

// A Input for positive numbers that can be null
// Useful for inputs with a placeholder
export default class NumberInput extends React.Component {
  handleChange = event => {
    const number = Number.parseInt(event.target.value.replace(/\D/, ""), 10);
    console.log(number);

    if (Number.isNaN(number)) {
      this.props.handleChange(null);
    } else {
      this.props.handleChange(number);
      if (number === 0) {
        this.cancelInput();
      }
    }
  };

  cancelInput = debounce(() => {
    if (this.props.value === 0) this.props.handleChange(null);
  }, 2000);

  render() {
    return (
      <input
        type="text"
        value={Number.isInteger(this.props.value) ? this.props.value : ""}
        onChange={this.handleChange}
      />
    );
  }
}
