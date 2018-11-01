import React from "react";
import styled from "styled-components/macro";
import EventDisplay from "./EventDisplay";
let StyledDay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  border: ${props => (props.selected ? "1px solid black" : "none")};
  background-color: ${props => (props.selected ? "whitesmoke" : "none")};
`;

const StyledDayTitle = styled.div`
  height: 35px;
`;

const StyledEvents = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: start;
  overflow: auto;
`;

const StyledEvent = styled.div`
  flex: 1;
`;

function Day({ day, selected, actions, setDay }) {
  function handleClick(e) {
    setDay(day);
  }

  return (
    <StyledDay selected={selected} onClick={handleClick}>
      <StyledDayTitle>{(day + 1) % 28}</StyledDayTitle>
      <StyledEvents>
        {actions.map(action => (
          <StyledEvent key={action.id}>
            <EventDisplay event={action} />
          </StyledEvent>
        ))}
      </StyledEvents>
    </StyledDay>
  );
}

export default React.memo(Day);
