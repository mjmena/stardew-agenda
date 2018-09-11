import React from "react";
import styled from "styled-components";
import Season from "./calendar/Season";
import events from "./events";
import update from "immutability-helper";

update.extend("$auto", function(value, object) {
  return object ? update(object, value) : update([], value);
});

const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
`;

const SeasonLayout = styled.div`
  width: 40%
  padding: 10px 10px
  flex-grow: 1
`;

const seasons = ["Spring", "Summer", "Fall", "Winter"];

export default class Calendar extends React.Component {
  state = {
    events: events
  };

  addEvent = season => day => event => {
    this.setState(state =>
      update(state, {
        events: {
          [season]: { [day]: { $auto: { $push: [event] } } }
        }
      })
    );
  };

  render() {
    console.log(this.state.events["Spring"]);
    return (
      <CalendarLayout>
        {seasons.map(season => (
          <SeasonLayout key={season}>
            <Season
              name={season}
              events={this.state.events[season]}
              addEvent={this.addEvent(season)}
            />
          </SeasonLayout>
        ))}
      </CalendarLayout>
    );
  }
}
