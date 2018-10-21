import React from "react";
import styled from "styled-components";

const StyledSeason = styled.div`
  display: flex
  flex-wrap: wrap
  flex-grow: 1
`;

const StyledTitle = styled.div`
    flex-grow: 1
    width: 100%
    text-align: center
`;

const StyledSeasonBlock = styled.div`
  flex-grow: 1
  width: 13%
  border: 1px solid black
`;

const StyledDay = styled(StyledSeasonBlock)`
  height: 100px;
`;

export default class Season extends React.PureComponent {
  static names_of_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  render() {
    const header = Season.names_of_days.map(day => (
      <StyledSeasonBlock key={day}>{day}</StyledSeasonBlock>
    ));

    const body = React.Children.map(this.props.children, (child, index) => {
      return <StyledDay key={index}>{child}</StyledDay>;
    });

    return (
      <StyledSeason>
        <StyledTitle>{this.props.season.name}</StyledTitle>
        {header}
        {body}
      </StyledSeason>
    );
  }
}
