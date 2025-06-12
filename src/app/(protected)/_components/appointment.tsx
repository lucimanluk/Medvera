import { Calendar, Clock, Video, PhoneCall, Shuffle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Appointment } from "~/types/appointment";
import type { User } from "~/types/user";

const data = {
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
};

export default function Appointment({
  props,
  user,
}: {
  props: Appointment;
  user: User;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {props.doctor.id === props.patient.id
                ? props.doctor.name
                : props.patient.name}
            </CardTitle>
            <CardDescription>
              {props.doctor.id === props.patient.id ? (
                data.doctor_speciality
              ) : (
                <span>Varsta + gen</span>
              )}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant={"outline"}>
            <Shuffle />
            Reschedule
          </Button>
          <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            <PhoneCall />
            Join call
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex w-3/4 flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Calendar width={18} height={18} />
          {props.appointmentDate.toDateString()}
        </div>
        <div className="g-1 flex flex-row items-center gap-2">
          <Clock width={18} height={18} />
          {props.appointmentDate.toTimeString().split("GMT")[0]}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Video width={18} height={18} />
          {props.patient.name}
        </div>
      </CardContent>
    </Card>
  );
}
