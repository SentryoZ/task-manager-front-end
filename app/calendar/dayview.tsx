import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function DayView() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Project A Meeting",
      start: "2024-09-26T09:00:00",
      end: "2024-09-26T10:00:00",
      groupId: "projectA",
      backgroundColor: "#ff9999",
      borderColor: "#ff0000",
    },
    {
      id: "2",
      title: "Project A Task",
      start: "2024-09-26T11:00:00",
      end: "2024-09-26T12:00:00",
      groupId: "projectA",
      backgroundColor: "#ff9999",
      borderColor: "#ff0000",
    },
    {
      id: "3",
      title: "Project B Meeting",
      start: "2024-09-26T10:00:00",
      end: "2024-09-26T11:00:00",
      groupId: "projectB",
      backgroundColor: "#9999ff",
      borderColor: "#0000ff",
    },
  ]);

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.start,
          end: info.event.end,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
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
      editable={true}
      droppable={true}
      events={events}
    />
  );
}
