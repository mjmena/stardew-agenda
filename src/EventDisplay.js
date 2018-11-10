import React from "react";
import CropImage from "./components/CropImage";
import PlanImage from "./PlanImage";

const PlanDisplay = ({ plan }) => {
  if (
    plan.type === "plant" ||
    plan.type === "replant" ||
    plan.type === "harvest"
  )
    return (
      <>
        <CropImage crop={plan.crop} seed={plan.type === "plant"} />
        <span>x{plan.quantity}</span>
      </>
    );
  else
    return (
      <>
        <PlanImage plan={plan} />
        {plan.name}
      </>
    );
};

export default React.memo(PlanDisplay);
