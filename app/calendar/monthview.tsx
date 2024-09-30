import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function DayView() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "event 1",
      start: "2024-09-26T06:00:00",
      end: "2024-09-26T07:00:00",
      backgroundColor: "red",
    },
    {
      id: "2",
      title: "hello",
      start: "2024-09-26T06:00:00",
      end: "2024-09-26T07:00:00",
      backgroundColor: "green",
    },
  ]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100%"
      slotDuration={"00:30:00"}
      slotLabelInterval="01:00"
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: "short",
      }}
      scrollTime="06:00:00"
      events={events}
    />
  );
}
