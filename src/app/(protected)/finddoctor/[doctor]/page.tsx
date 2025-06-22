"use client";

import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import TimeSlot from "../../_components/timeSlot";

export default function Doctor() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState();
  return (
    <div className="flex flex-row gap-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        startMonth={new Date()}
        disabled={{ before: new Date() }}
      />
      {date ? (
        <div className="flex h-72 w-32 flex-col gap-1 overflow-y-auto">
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
          <TimeSlot />
        </div>
      ) : null}
    </div>
  );
}
