import { Calendar, Clock, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const data = {
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
};

export default function Appointment() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>{data.doctor_name}</CardTitle>
          <CardDescription>{data.doctor_speciality}</CardDescription>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant={"outline"}>Reschedule</Button>
          <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            Join call
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text- flex w-3/4 flex-row justify-between">
        <div className="flex flex-row items-center text-sm">
          <Calendar width={18} height={18} />
          {data.date}
        </div>
        <div className="g-1 flex flex-row items-center">
          <Clock width={18} height={18} />
          {data.time}
        </div>
        <div className="flex flex-row items-center">
          <Video width={18} height={18} />
          {data.appointment_type}
        </div>
      </CardContent>
    </Card>
  );
}
