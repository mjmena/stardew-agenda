import React from "react";
import styled from "styled-components";
import range from "lodash/range";
import EventEditor from "./calendar/EventEditor";
import EventProvider from "./calendar/EventProvider";
import Season from "./calendar/Season";
import Day from "./calendar/Day";

import crops from "./data/crops";

const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
`;

export default class Calendar extends React.Component {
  static crops = range(128).map(date =>
    crops.filter(crop => date >= crop.start && date + crop.growth <= crop.end)
  );

  static seasons = [
    { name: "spring", start: 0 },
    { name: "summer", start: 28 },
    { name: "fall", start: 56 },
    { name: "winter", start: 84 }
  ];

  state = {
    date: 0,
    visible: true
  };

  handleSelectDate = date => {
    this.setState({ date });
  };

  render() {
    return (
      <EventProvider>
        {(events, createCropEvent, updateCropEvent, deleteCropEvent) => {
          return (
            <React.Fragment>
              <EventEditor
                key={this.state.date}
                date={this.state.date}
                crops={Calendar.crops[this.state.date]}
                events={events[this.state.date]}
                createCropEvent={createCropEvent}
                updateCropEvent={updateCropEvent}
                deleteCropEvent={deleteCropEvent}
              />

              <CalendarLayout>
                {Calendar.seasons.map(season => (
                  <Season key={season.name} season={season}>
                    {range(28).map(day => {
                      const day_in_year = day + season.start;
                      return (
                        <Day
                          key={day}
                          day_in_month={day + 1}
                          day_in_year={day_in_year}
                          selected={this.state.date === day_in_year}
                          events={events[day_in_year]}
                          selectDate={this.handleSelectDate}
                        />
                      );
                    })}
                  </Season>
                ))}
              </CalendarLayout>
            </React.Fragment>
          );
        }}
      </EventProvider>
    );
  }
}
