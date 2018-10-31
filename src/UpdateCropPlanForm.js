import React, { useCallback } from "react";
import PlanDetails from "./form/PlanDetails";

function UpdatePlanForm({ date, plan, updatePlan, deletePlan }) {
  const submit = useCallback(updated_plan => updatePlan(plan, updated_plan), [
    plan
  ]);

  const remove = useCallback(() => deletePlan(plan), [plan]);

  return (
    <>
      {plan.crop.name}
      <PlanDetails date={date} plan={plan} handleSubmit={submit} />
      <button onClick={remove}>Remove</button>
    </>
  );
}

export default React.memo(UpdatePlanForm);
