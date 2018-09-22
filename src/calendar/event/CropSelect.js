import React from "react";
import styled from "styled-components";
import EditCrop from "./EditCrop";
import { Table, Row, Cell } from "./Table";

export default class CropSelect extends React.Component {
  handleChangeCrop = event => {
    this.props.changeCrop(
      this.props.crops.find(crop => crop.id === event.target.value)
    );
  };

  render() {
    return (
      <Table>
        <Row>
          <Cell>Crop</Cell>
          <Cell>Price</Cell>
          <Cell>Quantity</Cell>
          <Cell>Replant</Cell>
        </Row>
        {this.props.crops.map(crop => (
          <EditCrop key={crop.id} crop={crop} />
        ))}
      </Table>
    );
  }
}
