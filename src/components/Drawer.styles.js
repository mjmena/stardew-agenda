import styled from "styled-components/macro";

export default {
  Container: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
  `,
  Handle: styled.div`
    align-self: center;
    background-color: WhiteSmoke;
  `,
  Drawer: styled.div`
    display: ${props => (props.visible ? "flex" : "none")};
    flex: 1;
    padding: 5vh;
    background-color: WhiteSmoke;
  `
};
