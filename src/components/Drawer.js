import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ReactComponent as ThreeBars } from "../images/three-bars.svg";
import Style from "./Drawer.styles";

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
    <Style.Container>
      <Style.Handle onClick={handleToggle}>
        <ThreeBars />
      </Style.Handle>
      <Style.Drawer visible={visible}>{children}</Style.Drawer>
    </Style.Container>,
    container
  );
}

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default React.memo(Drawer);
