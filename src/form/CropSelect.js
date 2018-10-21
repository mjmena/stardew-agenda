import React from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import CropImage from "../components/CropImage";
export default class CropSelect extends React.Component {
  render() {
    return (
      <Select
        menuPlacement="top"
        name="crop"
        value={this.props.crop}
        options={this.props.crops}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        onChange={this.props.onChange}
        components={{
          Menu: CropMenu,
          Option: CropOption,
          SingleValue: CropSingleValue
        }}
      />
    );
  }
}
const StyledOption = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledFlexbox = styled.div`
  flex: ${props => props.flex};
  text-align: ${props => (props.number ? "right" : "left")};
`;

const CropOption = props => {
  const crop = props.data;
  return (
    <components.Option {...props}>
      <StyledOption>
        <StyledFlexbox flex={2}>
          <CropImage crop={crop} />
          {props.children}
        </StyledFlexbox>
        <StyledFlexbox flex={1} number={true}>
          {crop.buy}
        </StyledFlexbox>
        <StyledFlexbox flex={1} number={true}>
          {crop.growth}
        </StyledFlexbox>
      </StyledOption>
    </components.Option>
  );
};

const CropMenu = props => {
  return (
    <React.Fragment>
      <StyledOption>
        <StyledFlexbox flex={2}>Crop</StyledFlexbox>
        <StyledFlexbox flex={1} number={true}>
          Price
        </StyledFlexbox>
        <StyledFlexbox flex={1} number={true}>
          Growth
        </StyledFlexbox>
      </StyledOption>
      <components.Menu {...props}>{props.children}</components.Menu>
    </React.Fragment>
  );
};

const CropSingleValue = props => (
  <components.SingleValue {...props}>
    <CropImage crop={props.data} />
    {props.children}
  </components.SingleValue>
);
