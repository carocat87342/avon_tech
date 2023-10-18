import React, { useEffect, useState } from "react";

// eslint-disable-next-line import/order
import FullCalendar from "@fullcalendar/react"; // this import should be at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import PropTypes from "prop-types";

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: eventInfo.event.backgroundColor,
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
          whiteSpace: "normal",
        }}
      >
        {moment(eventInfo?.event?.extendedProps?.start_dt)?.format("h:mm")}
        {" "}
        {eventInfo.event.title}
      </p>
    </>
  );
}

const EventCalendar = ({
  filter, onDayClick, onEventClick, ...props
}) => {
  const [filteredEvents, setFilteredEvent] = useState([]);

  useEffect(() => {
    if (!filter) {
      const eventsAfterFilter = props.events.filter((e) => e.status !== "D");
      setFilteredEvent(eventsAfterFilter);
    } else {
      setFilteredEvent(props.events);
    }
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.events, filter]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      weekends
      events={filteredEvents}
      eventContent={renderEventContent}
      dateClick={(arg) => onDayClick(arg.dateStr)}
      eventClick={(info) => onEventClick(info)}
      fixedWeekCount={false}
    />
  );
};

EventCalendar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      start_dt: PropTypes.string.isRequired,
      end_dt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventCalendar;
