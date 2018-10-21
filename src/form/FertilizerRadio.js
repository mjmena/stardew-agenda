import React from "react";
import styled from "styled-components";
import fertilizers from "../data/fertilizers";

export default class FertilizerRadio extends React.Component {
  handleChange = event => {
    const fertilizer = fertilizers[event.target.value];
    this.props.updateFertilizer(fertilizer);
  };

  render() {
    const [none, bf, qf, sg, dsg] = fertilizers.map((fertilizer, index) => (
      <>
        <input
          type="radio"
          id={fertilizer.id}
          name={fertilizer.id}
          value={index}
          checked={fertilizer.id === this.props.fertilizer.id}
          onChange={this.handleChange}
        />
        <label htmlFor={fertilizer.id}>{fertilizer.name}</label>
      </>
    ));
    return (
      <StyledRadioGroup>
        {none}
        {bf}
        {qf}
        {sg}
        {dsg}
      </StyledRadioGroup>
    );
  }
}

const StyledRadioGroup = styled.div`
  display: flex
  flex-flow: row nowrap
`;
