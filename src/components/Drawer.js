import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components/macro";
import { ReactComponent as ThreeBars } from "../images/three-bars.svg";
const StyledDrawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
`;
const StyledHandle = styled.div`
  align-self: center;
  background-color: WhiteSmoke;
`;

const StyledContent = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex: 1;
  padding: 5vh;
  background-color: WhiteSmoke;
`;

const container = document.createElement("div");
function Drawer({ visible, onOpen, onClose, children }) {
  useEffect(() => {
    document.body.appendChild(container);
  }, []);

  const handleToggle = useCallback(() => {
    if (visible) onClose();
    else onOpen();
  });

  return ReactDOM.createPortal(
    <StyledDrawer>
      <StyledHandle onClick={handleToggle}>
        <ThreeBars />
      </StyledHandle>
      <StyledContent visible={visible}>{children}</StyledContent>
    </StyledDrawer>,
    container
  );
}

export default React.memo(Drawer);
