import styled from "styled-components/macro";

const Style = {
  Container: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  `,
  Header: styled.div`
    height: 35px;
  `,
  Body: styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: column wrap;
    justify-content: start;
    overflow: auto;
  `,

  Box: styled.div`
    flex: 1;
  `
};

export default Style;
