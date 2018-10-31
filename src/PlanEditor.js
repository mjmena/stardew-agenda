import React, { useMemo } from "react";
import CreateCropPlanForm from "./CreateCropPlanForm";
import UpdateCropPlanForm from "./UpdateCropPlanForm";

function PlanEditor({ date, plans, createPlan, updatePlan, deletePlan }) {
  const editable_plans = useMemo(
    () =>
      plans
        .filter(plan => plan.isPlantDate(date))
        .map(plan => (
          <UpdateCropPlanForm
            key={plan.id}
            date={date}
            plan={plan}
            updatePlan={updatePlan}
            deletePlan={deletePlan}
          />
        )),
    [date, plans]
  );

  return (
    <>
      <CreateCropPlanForm date={date} createPlan={createPlan} />
      {editable_plans}
    </>
  );
}

export default React.memo(PlanEditor);
