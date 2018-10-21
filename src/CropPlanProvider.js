import React from "react";
import {
  createCropPlanAction,
  deleteCropPlanAction,
  cropPlanReducer
} from "./utils/CropPlanReducer";

export default class PlanProvider extends React.Component {
  state = {
    plans: []
  };

  createCropPlan = plan => {
    this.setState(state => ({
      plans: cropPlanReducer(state.plans, createCropPlanAction(plan))
    }));
  };

  deleteCropPlan = plan => {
    this.setState(state => ({
      plans: cropPlanReducer(state.plans, deleteCropPlanAction(plan))
    }));
  };

  updateCropPlan = (old_plan, new_plan) => {
    this.deleteCropPlan(old_plan);
    this.createCropPlan(new_plan);
  };

  render = () =>
    this.props.children(
      this.state.plans,
      this.createCropPlan,
      this.updateCropPlan,
      this.deleteCropPlan
    );
}
