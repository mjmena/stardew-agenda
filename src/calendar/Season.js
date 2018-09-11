import React from "react";
import styled from "styled-components";
import Date from "./Date";

const CalendarContainer = styled.div`
  display: flex
  flex-wrap: wrap
`;

const CalendarBlock = styled.div`
  flex-grow: 1
  width: 13%
  height: 50px
  border: 1px solid black
`;

const Title = styled.div`
    flex-grow: 1
    width: 100%
`;

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

//Make and array from 1-28, basically a range function
const dates = Array.from({ length: 28 }).map((date, index) => index + 1);

export default class Season extends React.Component {
  render() {
    return (
      <CalendarContainer>
        <Title>{this.props.name}</Title>
        {days.map(day => (
          <CalendarBlock key={day}>{day}</CalendarBlock>
        ))}
        {dates.map(date => (
          <CalendarBlock key={date}>
            <Date
              date={date}
              events={this.props.events[date]}
              addEvent={this.props.addEvent(date)}
            />
          </CalendarBlock>
        ))}
      </CalendarContainer>
    );
  }
}
