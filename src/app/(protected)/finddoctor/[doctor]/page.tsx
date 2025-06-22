"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Calendar } from "~/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import TimeSlot from "../../_components/timeSlot";
import { api } from "~/trpc/react";

export default function Doctor() {
  const params = useParams();
  const rawId = params.doctor;
  if (typeof rawId !== "string") {
    return <div>Invalid or missing doctor ID</div>;
  }
  const id: string = rawId;
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState();

  console.log(date);

  const { data, isLoading, error } = api.doctor.getPage.useQuery({
    doctor: id,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const slots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  return (
    <div className="flex h-screen w-full flex-col items-center gap-4 bg-teal-50 py-4 pr-4">
      <Card className="flex h-full w-3/4 flex-col border-none p-4 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between p-0">
          <div className="flex flex-row items-center gap-2">
            <div className="h-20 w-20 rounded-full bg-black" />
            <div className="flex flex-col gap-1">
              <CardTitle>Dr. {data?.name}</CardTitle>
              <span className="text-sm">Poate mai bag ceva aici la misto</span>
              <CardDescription>specialitate</CardDescription>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <span>Date: {date?.toDateString()}</span>
            <span>Time: 19:30 AM</span>
            <Button>Make appointment</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-row justify-center gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">Choose a date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                startMonth={new Date()}
                disabled={{ before: new Date() }}
              />
            </div>
            {date ? (
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg font-medium">Choose the time</h3>
                <div className="flex h-72 w-32 flex-col gap-1 overflow-y-auto">
                  {slots.map((time, index) => (
                    <TimeSlot hour={time} key={index} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
