import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";

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

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
            <ScrollArea className="h-72 w-full">
              {appointments.length === 4 ? (
                <span>No upcoming appoinments.</span>
              ) : (
                appointments.map((appointment, index) => (
                  <div key={index} className="p-2"></div>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Prescriptions</CardTitle>
            <CardDescription>
              {session?.user.doctor ? (
                <span>Prescriptions that you have assigned</span>
              ) : (
                <span>Prescriptions that you need to take</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full">
              {appointments.length === 4 ? (
                <span>No upcoming appoinments.</span>
              ) : (
                appointments.map((appointment, index) => (
                  <div key={index} className="p-2"></div>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
