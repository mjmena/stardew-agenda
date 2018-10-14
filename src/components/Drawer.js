import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledHandle = styled.div`
  align-self: center;
`;

const StyledDrawer = styled.div`
  position: fixed;
  bottom:0
  left:0
  width: 100vw;
  display:flex;
  flex-flow: column nowrap
`;

const StyledContent = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex:1
  padding: 5vh
  background-color: rgba(255, 0, 0, 0.4);
`;

export default class Drawer extends React.Component {
  state = {
    visible: false
  };

  container = document.createElement("div");

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  handleToggleVisibility = event => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    return ReactDOM.createPortal(
      <StyledDrawer>
        <StyledHandle onClick={this.handleToggleVisibility}>
          Handle
        </StyledHandle>
        <StyledContent visible={this.state.visible}>
          {this.props.children}
        </StyledContent>
      </StyledDrawer>,
      this.container
    );
  }
}
