import React from "react";
import styled from "styled-components";

const Alignment = styled.div`
  top: ${props => (props.alignment === "top" ? 0 : "auto")}
  bottom: ${props => (props.alignment === "bottom" ? 0 : "auto")}
  left: ${props => (props.alignment === "left" ? 0 : "auto")}
  right: ${props => (props.alignment === "right" ? 0 : "auto")}
`;

const StyledHandle = styled(Alignment)``;

const StyledDrawer = styled(Alignment)`
  position: fixed;
  background-color: rgba(255, 0, 0, 0.4);
  width: 100%;
`;

const StyledContent = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
`;

export default class Drawer extends React.Component {
  state = {
    visible: false
  };

  handleToggleVisibility = event => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    return (
      <StyledDrawer alignment={this.props.alignment}>
        <StyledHandle onClick={this.handleToggleVisibility}>
          Handle
        </StyledHandle>
        <StyledContent visible={this.state.visible}>
          {this.props.children}
        </StyledContent>
      </StyledDrawer>
    );
  }
}
