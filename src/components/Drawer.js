import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragHandle as Handle } from "styled-icons/material";

const StyledDrawer = styled.div`
  position: fixed;
  bottom:0
  left:0
  width: 100vw;
  display:flex;
  flex-flow: column nowrap
`;
const StyledHandle = styled(Handle)`
  align-self: center;
  background-color: WhiteSmoke;
`;

const StyledContent = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex:1
  padding: 5vh
  background-color: WhiteSmoke;
`;

export default class Drawer extends React.Component {
  state = {
    visible: false
  };

  container = document.createElement("div");

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  handleToggle = () => {
    if (this.props.open) this.props.onClose();
    else this.props.onOpen();
  };

  render() {
    return ReactDOM.createPortal(
      <StyledDrawer>
        <StyledHandle size={50} onClick={this.handleToggle} />
        <StyledContent visible={this.props.open}>
          {this.props.children}
        </StyledContent>
      </StyledDrawer>,
      this.container
    );
  }
}
