"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";
import Appointment from "../_components/appointment";
import PrescriptionCard from "../prescriptions/_components/prescriptionCard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const {
    data: appointments,
    isLoading: loadingAppointments,
    error: appointmentsError,
  } = api.appointment.getDashboardAppointments.useQuery();
  const {
    data: prescriptions,
    isLoading: loadingPrescriptions,
    error: prescriptionsError,
  } = api.prescription.getDashboardPrescriptions.useQuery();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayTime = todayStart.getTime();
  if (loadingAppointments || loadingPrescriptions) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (appointmentsError || prescriptionsError) {
    return <div>Error</div>;
  }
  console.log(appointments?.user?.name);
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Dashboard</span>
        <span className="text-base text-gray-400">
          Quick view into your prescriptions, appointments and messages
        </span>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>See your future appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-68 w-full">
              {!appointments?.data || appointments.data.length === 0 ? (
                <span>No appointments ongoing.</span>
              ) : (
                appointments.data
                  .filter(
                    (appointment) =>
                      appointment.appointmentDate.getTime() >= Date.now(),
                  )
                  .map((appointment, idx) => (
                    <div className="mb-2" key={idx}>
                      <Appointment
                        appointment={appointment}
                        user={appointments.user!}
                        type="ongoing"
                      />
                    </div>
                  ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Prescriptions</CardTitle>
            <CardDescription>
              {appointments?.user?.doctor ? (
                <span>Prescriptions that you have assigned</span>
              ) : (
                <span>Prescriptions that you need to take</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-68 w-full">
              {prescriptions?.data.length === 0 ? (
                <span>No prescriptions ongoing.</span>
              ) : (
                prescriptions?.data
                  .filter(
                    (prescription) =>
                      prescription.endingDate.getTime() >= todayTime,
                  )
                  .map((prescription, idx) => (
                    <div className="mb-2" key={idx}>
                      <PrescriptionCard
                        props={prescription}
                        user={prescriptions.user!}
                        type="ongoing"
                      />
                    </div>
                  ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
