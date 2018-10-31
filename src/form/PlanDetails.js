import React, { useState, useCallback } from "react";
import useAmountState from "./useAmountState";
import NumberInput from "./NumberInput";
import FertilizerRadio from "./FertilizerRadio";
import CropPlan from "../utils/CropPlan";

function PlanDetails({ date, plan, handleSubmit }) {
  const [quantity, price, setQuantity, setPrice] = useAmountState(
    plan.quantity,
    plan.crop.buy
  );
  const [fertilizer, setFertilizer] = useState(plan.fertilizer);
  const [replant, setReplant] = useState(plan.shouldReplant());

  const submit = useCallback(e => {
    e.preventDefault();
    handleSubmit(
      new CropPlan({
        crop: plan.crop,
        quantity,
        fertilizer,
        replant,
        start_date: date
      })
    );
  });

  const toggleReplant = useCallback(e => setReplant(!replant), [replant]);

  return (
    <form onSubmit={submit}>
      <NumberInput value={quantity} handleValue={setQuantity} />
      <NumberInput value={price} handleValue={setPrice} />
      <FertilizerRadio
        value={fertilizer}
        handleValue={setFertilizer}
        tag={plan.id}
      />
      {!plan.crop.regrowth && (
        <input type="checkbox" checked={replant} onChange={toggleReplant} />
      )}
      <button>Submit</button>
    </form>
  );
}

export default React.memo(PlanDetails);
