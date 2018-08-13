import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const Calendar = props => {
  return (
    <div>
      <BigCalendar
        events={props.events}
        defaultView="week"
        selectable={true}
        onSelectEvent={props.selectSession}
        onSelectSlot={props.onSelectSlot}
       // date={props.eventStartDate}
        min={new Date("2018, 1, 1, 08:00")}
        max={new Date("2018, 1, 1, 20:00")}
        step={15}
      />
    </div>
  );
};

export default Calendar;
