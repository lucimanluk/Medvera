import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import Appointment from "../_components/appointment";

const appointments = [
  {
    doctor_name: "Andrei Denis",
    doctor_speciality: "Cardiology",
    date: "10/06/2025",
    time: "21:15",
    appointment_type: "virtual",
    location: "",
    avatar: "",
  },
  {
    doctor_name: "Andrei Denis",
    doctor_speciality: "Cardiology",
    date: "10/06/2025",
    time: "21:15",
    appointment_type: "virtual",
    location: "",
    avatar: "",
  },
  {
    doctor_name: "Andrei Denis",
    doctor_speciality: "Cardiology",
    date: "10/06/2025",
    time: "21:15",
    appointment_type: "virtual",
    location: "",
    avatar: "",
  },
  {
    doctor_name: "Andrei Denis",
    doctor_speciality: "Cardiology",
    date: "10/06/2025",
    time: "21:15",
    appointment_type: "virtual",
    location: "",
    avatar: "",
  },
];

export default function Dashboard() {

  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Dashboard</span>
        <span className="text-base text-gray-400">
          Quick view into your prescriptions, appointments and messages
        </span>
      </div>
      <div className="flex w-full flex-row justify-between gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>See your future appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 4 ? (
              <span>No upcoming appointments.</span>
            ) : (
              <ScrollArea className="h-72 w-full">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-2">
                    <Appointment />
                  </div>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              See what messages you have received
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 4 ? (
              <span>No upcoming appointments.</span>
            ) : (
              <ScrollArea className="h-72 w-full">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-2">
                    <Appointment />
                  </div>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
          <CardDescription>Prescriptions that you need to take</CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length === 4 ? (
            <div>
              <span>No upcoming appointments.</span>
            </div>
          ) : (
            <ScrollArea className="h-72 w-full">
              {appointments.map((appointment, index) => (
                <div key={index} className="p-2">
                  <Appointment />
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
