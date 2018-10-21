import React from "react";
import styled from "styled-components";
import CreateCropPlanForm from "./CreateCropPlanForm";
import UpdateCropPlanForm from "./UpdateCropPlanForm";

export default class PlanEditor extends React.Component {
  render() {
    const editable_plans = this.props.plans
      .filter(plan => plan.isPlantDate(this.props.date))
      .map(plan => (
        <UpdateCropPlanForm
          key={plan.id + plan.quantity}
          plan={plan}
          updateCropPlan={this.props.updateCropPlan}
          deleteCropPlan={this.props.deleteCropPlan}
        />
      ));

    return (
      <StyledEditor>
        <CreateCropPlanForm
          crops={this.props.crops}
          date={this.props.date}
          createCropPlan={this.props.createCropPlan}
        />
        {editable_plans}
      </StyledEditor>
    );
  }
}

const StyledEditor = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;
