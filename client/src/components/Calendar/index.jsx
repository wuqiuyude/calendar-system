import React, { PureComponent } from "react";
import moment from "moment";
import _ from "lodash";
import Calendar from "yx-drag-calendar";
import CalendarForm from "../CalendarForm";
import { createActivity } from "../../services/activity";

export default class MyCalendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      monthStr: moment(new Date()).format("YYYY-MM"),
      eventList: []
    };
  }

  onChangeTime = (id, newStartTime, newEndtime) => {
    console.log(id, newStartTime, newEndtime);
  };

  deleteEvent = id => {
    const { eventList } = this.state;
    let newEventList = JSON.parse(JSON.stringify(eventList));
    newEventList = _.filter(newEventList, e => {
      return e.id !== id;
    });
    this.setState({
      eventList: newEventList
    });
  };

  createNewEvent = (startTime, endTime) => {
    createActivity({
      from: startTime,
      to: endTime,
      title: "new activtiy"
    }).then(() => {
      this.props.OnUpdate();
    });
  };

  changeMonth = month => {
    this.setState({
      monthStr: month
    });
  };

  render() {
    const { monthStr } = this.state;
    const { list } = this.props;
    return (
      <div style={{ margin: "40px" }}>
        <Calendar
          monthStr={monthStr}
          eventList={list}
          eventForm={(event, closePopover) => {
            return (
              <CalendarForm event={event} closePopover={closePopover} onChangeTime={this.onChangeTime} deleteEvent={this.deleteEvent} />
            );
          }}
          changeMonth={this.changeMonth}
          onChangeTime={this.onChangeTime}
          deleteEvent={this.deleteEvent}
          createNewEvent={this.createNewEvent}
        />
      </div>
    );
  }
}
