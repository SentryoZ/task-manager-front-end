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
      title: "Meeting with Team",
      start: "2024-09-26T10:00:00",
      end: "2024-09-26T11:30:00",
      allDay: false,
      url: "https://meeting-link.com",
      classNames: ["important-meeting"],
      editable: true,
      backgroundColor: "#3788d8",
      borderColor: "#3788d8",
      textColor: "#ffffff",
      extendedProps: {
        department: "Engineering",
      },
      display: "block",
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
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
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
      nowIndicator={true}
      events={events}
      editable={true}
    />
  );
}
