import React, { useState, useMemo } from "react";
import crops from "./data/crops";
import PlanDetails from "./form/PlanDetails";
import CropSelect from "./form/CropSelect";
import fertilizers from "./data/fertilizers";

const none = fertilizers[0];
function CreateCropPlanForm({ date, createPlan }) {
  const filtered_crops = useMemo(
    () =>
      crops.filter(
        crop => date >= crop.start && date + crop.growth <= crop.end
      ),
    [date]
  );

  const [crop, setCrop] = useState(null);
  const plan = {
    id: "create",
    crop,
    quantity: 1,
    fertilizer: none,
    shouldReplant: () => false
  };

  return (
    <>
      <CropSelect value={crop} handleValue={setCrop} crops={filtered_crops} />
      {crop && (
        <PlanDetails
          key={crop.id}
          date={date}
          plan={plan}
          handleSubmit={createPlan}
        />
      )}
    </>
  );
}

export default React.memo(CreateCropPlanForm);
