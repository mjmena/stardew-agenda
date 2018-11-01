import styled from "styled-components/macro";

const BaseBlock = styled.div`
  flex: 1 1 13%;
  border: 1px solid whitesmoke;
`;

const Style = {
  Container: styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  `,
  Title: styled.div`
    width: 100%;
    text-align: center;
    font-size: 2em;
  `,
  Header: styled(BaseBlock)`
    text-align: center;
    font-size: 1.2em;
  `,
  Block: styled(BaseBlock)`
    height: 15vh;
  `
};

export default Style;
