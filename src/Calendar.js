import React from "react";
import styled from "styled-components";
import range from "lodash/range";
import PlanEditor from "./PlanEditor";
import CropPlanProvider from "./CropPlanProvider";
import Drawer from "./components/Drawer";
import Season from "./Season";
import Day from "./Day";

import crops from "./data/crops";

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
    this.handleOpen();
  };

  handleOpen = () => {
    this.setState({ visible: true });
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  displaySeason = (season, plans) => {
    return (
      <Season key={season.name} season={season}>
        {range(28).map(day => {
          const day_in_year = day + season.start;
          const actions = plans
            .flatMap(plan => plan.getCropActionsOnDate(day_in_year))
            .reduce((uniques, action) => {
              const unique = uniques.get(action.id);
              if (unique) {
                unique.quantity += action.quantity;
              } else {
                uniques.set(action.id, action);
              }
              return uniques;
            }, new Map())
            .values();

          return (
            <Day
              key={day}
              day_in_month={day + 1}
              day_in_year={day_in_year}
              selected={this.state.date === day_in_year}
              actions={[...actions]}
              selectDate={this.handleSelectDate}
            />
          );
        })}
      </Season>
    );
  };

  render() {
    return (
      <CropPlanProvider>
        {(plans, createCropPlan, updateCropPlan, deleteCropPlan) => {
          return (
            <React.Fragment>
              <Drawer
                open={this.state.visible}
                onOpen={this.handleOpen}
                onClose={this.handleClose}
              >
                <PlanEditor
                  key={this.state.date}
                  date={this.state.date}
                  crops={Calendar.crops[this.state.date]}
                  plans={plans}
                  createCropPlan={createCropPlan}
                  updateCropPlan={updateCropPlan}
                  deleteCropPlan={deleteCropPlan}
                />
              </Drawer>

              <CalendarLayout>
                {this.displaySeason(Calendar.seasons[0], plans)}
              </CalendarLayout>
            </React.Fragment>
          );
        }}
      </CropPlanProvider>
    );
  }
}

const CalendarLayout = styled.div`
  display: flex
  flex-wrap: wrap
  height: 100%
`;
