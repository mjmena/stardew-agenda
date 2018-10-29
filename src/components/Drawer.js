import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledDrawer = styled.div`
  position: fixed;
  bottom:0
  left:0
  width: 100vw;
  display:flex;
  flex-flow: column nowrap
`;
const StyledHandle = styled.div`
  align-self: center;
  background-color: WhiteSmoke;
`;

const StyledContent = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex:1
  padding: 5vh
  background-color: WhiteSmoke;
`;

export default class Drawer extends React.PureComponent {
  container = document.createElement("div");

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  handleToggle = () => {
    if (this.props.visible) this.props.onClose();
    else this.props.onOpen();
  };

  render() {
    return ReactDOM.createPortal(
      <StyledDrawer>
        <StyledHandle onClick={this.handleToggle}> handle</StyledHandle>
        <StyledContent visible={this.props.visible}>
          {this.props.children}
        </StyledContent>
      </StyledDrawer>,
      this.container
    );
  }
}
