import React, { useCallback } from "react";
import ActionDisplay from "./ActionDisplay";
import Style from "./Day.style";

function Day({ day, selected, actions = [], setDay }) {
  const handleClick = useCallback(
    () => {
      setDay(day);
    },
    [day]
  );

  return (
    <Style.Container selected={selected} onClick={handleClick}>
      <Style.Header>{(day + 1) % 28}</Style.Header>
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
