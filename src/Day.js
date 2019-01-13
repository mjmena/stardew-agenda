import React, { useCallback } from "react";
import ActionDisplay from "./ActionDisplay";
import Style from "./Day.style";

function Day({ day, actions = [] }) {
  return (
    <Style.Container>
      <Style.Header>{day}</Style.Header>
      <Style.Body>
        {actions.map(action => (
          <Style.Box key={action.id}>
            <ActionDisplay action={action} />
          </Style.Box>
        ))}
      </Style.Body>
    </Style.Container>
  );
}

export default React.memo(Day);
