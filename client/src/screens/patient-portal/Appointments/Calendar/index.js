import React from "react";

// eslint-disable-next-line import/order
import FullCalendar from "@fullcalendar/react"; // this import should be at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import PropTypes from "prop-types";
import "./calendar.css";

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: eventInfo.event.backgroundColor,
          borderColor: eventInfo.event.backgroundColor,
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        {eventInfo.timeText}
        {" "}
        {eventInfo.event.title}
      </p>
    </>
  );
}

const getCellClassName = (dayInfo, selected) => {
  const { date } = dayInfo;
  const isSelectedDay = moment(date).format("YYYY-MM-DD") === selected;
  return isSelectedDay ? "selected-day" : "";
};

const EventCalendar = ({
  events, onDayClick, onEventClick, selectedDate,
}) => (
  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    headerToolbar={{
      left: "title",
      center: "",
      right: "prev next",
    }}
    initialView="dayGridMonth"
    weekends
    events={events}
    eventContent={renderEventContent}
    dayCellClassNames={(arg) => getCellClassName(arg, selectedDate)}
    dateClick={(arg) => onDayClick(arg.dateStr)}
    eventClick={(info) => onEventClick(info)}
    selectable
    fixedWeekCount={false}
  />
);

EventCalendar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default EventCalendar;
