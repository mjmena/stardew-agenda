import React from "react";
import styled from "styled-components";
import CropPlan from "./utils/CropPlan";
import CropPlanDetailsFragment from "./form/CropPlanDetailsFragment";
import CropImage from "./components/CropImage";
export default class UpdateCropPlanForm extends React.Component {
  state = {
    quantity: this.props.plan.quantity,
    price: this.props.plan.quantity * this.props.plan.crop.buy,
    replant: this.props.plan.shouldReplant(),
    fertilizer: this.props.plan.fertilizer
  };

  setDetails = details => {
    this.setState(details);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { quantity, replant, fertilizer } = this.state;
    this.props.updateCropPlan(
      this.props.plan,
      new CropPlan({
        start_date: this.props.plan.start_date,
        crop: this.props.plan.crop,
        quantity,
        replant,
        fertilizer
      })
    );
  };

  handleDeleteClick = event => {
    event.preventDefault();
    this.props.deleteCropPlan(this.props.plan);
  };

  render() {
    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFlex flex={2}>
            <CropImage crop={this.props.plan.crop} />
            {this.props.plan.crop.name}
          </StyledFlex>
          <CropPlanDetailsFragment
            crop={this.props.plan.crop}
            quantity={this.state.quantity}
            price={this.state.price}
            replant={this.state.replant}
            fertilizer={this.state.fertilizer}
            setDetails={this.setDetails}
          />
          <StyledFlex>
            <button>Submit</button>
            <button onClick={this.handleDeleteClick}>Remove</button>
          </StyledFlex>
        </StyledForm>
      </>
    );
  }
}

const StyledForm = styled.form`
  display: flex
  flex-flow: row wrap
`;

const StyledFlex = styled.div`
  flex: ${props => props.flex || 1};
`;
