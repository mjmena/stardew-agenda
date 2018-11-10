import React from "react";
import ActionImage from "./ActionImage";
import styled from "styled-components";

const Special = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const ActionDisplay = ({ action }) => {
  const image = <ActionImage action={action} />;
  if (action.type === "plant" || action.type === "harvest")
    return (
      <>
        {image}
        {`x ${action.quantity}`}
      </>
    );
  else return <Special> {image} </Special>;
};

export default React.memo(ActionDisplay);
