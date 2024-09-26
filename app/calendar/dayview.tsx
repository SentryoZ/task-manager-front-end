import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function DayView() {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin]} // Plugins for day/week/month views
      initialView="timeGridDay" // Day view
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
    />
  );
}
