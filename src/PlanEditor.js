import React, { useMemo } from "react";
import CreateCropPlanForm from "./CreateCropPlanForm";
import UpdateCropPlanForm from "./UpdateCropPlanForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Box = styled.div`
  flex: 1;
`;

function PlanEditor({ date, plans, createPlan, updatePlan, deletePlan }) {
  const editable_plans = useMemo(
    () =>
      plans
        .filter(plan => plan.isPlantDate(date))
        .map(plan => (
          <Box key={plan.id}>
            <UpdateCropPlanForm
              date={date}
              plan={plan}
              updatePlan={updatePlan}
              deletePlan={deletePlan}
            />
          </Box>
        )),
    [date, plans]
  );

  return (
    <Container>
      <Box>
        <CreateCropPlanForm date={date} createPlan={createPlan} />
      </Box>
      {editable_plans}
    </Container>
  );
}

export default React.memo(PlanEditor);
