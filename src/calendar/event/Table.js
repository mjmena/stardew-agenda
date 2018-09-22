import styled from "styled-components";

const Table = styled.div`
  display: flex
  flex-direction: column
`;

const Row = styled.form`
  display:flex
  flex:2  
  justify-content: space-between
  flex-direction: row
  flex-wrap: wrap
`;

const Cell = styled.div`
  flex: 1;
`;

export { Table, Row, Cell };
