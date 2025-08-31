"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Doctor() {
  const params = useParams();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<Date | undefined>();

  useEffect(() => {
    setTime(undefined);
  }, [date]);

  const rawId = params.doctor;
  const id = typeof rawId === "string" ? rawId : "";

  const checkout = api.checkout.createSession.useMutation();

  const handleCheckout = async () => {
    if (!date || !time || !data?.doctorProfile?.id) return;

    const appointmentDateISO = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    ).toISOString();

    const res = await checkout.mutateAsync({
      doctorId: id,
      doctorProfileId: data?.doctorProfile?.id,
      appointmentDate: appointmentDateISO,
    });

    if (res.url) {
      window.location.href = res.url;
    }
  };

  const { data, isLoading, error } = api.doctor.getPage.useQuery(
    { doctor: id },
    { enabled: !!id },
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slots =
    data?.doctorProfile?.appointmentDuration == 60
      ? ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]
      : data?.doctorProfile?.appointmentDuration == 30
        ? [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
          ]
        : data?.doctorProfile?.appointmentDuration == 15
          ? [
              "09:00",
              "09:15",
              "09:30",
              "09:45",
              "10:00",
              "10:15",
              "10:30",
              "10:45",
              "11:00",
              "11:15",
              "11:30",
              "11:45",
              "13:00",
              "13:15",
              "13:30",
              "13:45",
              "14:00",
              "14:15",
              "14:30",
              "14:45",
              "15:00",
              "15:15",
              "15:30",
              "15:45",
              "16:00",
              "16:15",
              "16:30",
              "16:45",
              "17:00",
              "17:15",
              "17:30",
              "17:45",
            ]
          : [];

  const now = new Date();
  const isToday = date && date.toDateString() === now.toDateString();

  const visibleSlots = slots.filter((slot) => {
    if (!isToday) return true;
    const [h = 0, m = 0] = slot.split(":").map(Number);
    return h > now.getHours() || (h === now.getHours() && m > now.getMinutes());
  });

  const times = visibleSlots.map((slot) => {
    const [h = 0, m = 0] = slot.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  });

  const {
    data: userAppointments,
    isLoading: userAppointmentLoading,
    error: userAppointmentError,
  } = api.appointment.getAppointments.useQuery();

  if (isLoading || userAppointmentLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (error || userAppointmentError) {
    return <div>Error</div>;
  }
  if (data === null) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <span>ERROR: COULDN'T FIND DOCTOR</span>
        <Link href="/finddoctor">
          <Button variant="outline">Go back</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-full flex-col items-center gap-4 bg-teal-50 py-4 pr-4">
        <Card className="flex h-full w-3/4 flex-col border-none px-16 py-4 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <div className="flex flex-row items-center gap-2">
              <div className="relative h-18 w-18 self-center overflow-hidden rounded-full">
                <Image
                  src={data?.doctorProfile?.image || "/default_pfp.jpg"}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>
                  Dr. {data?.doctorProfile?.firstName}{" "}
                  {data?.doctorProfile?.lastName}
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <span>{data?.doctorProfile?.specialization}</span>
                  <span>
                    Cabinet phone number: {data?.doctorProfile?.cabinetPhone}
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="font-bold">Date: {date?.toDateString()} </span>
              <span className="font-bold">
                Time: {time?.toTimeString().split("GMT")[0]}
              </span>
              <span className="font-bold">
                Price: {data?.doctorProfile?.appointmentPrice} lei
              </span>
              <Button
                className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                disabled={!date || !time || checkout.isPending}
                onClick={handleCheckout}
              >
                {checkout.isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> <p>Processing...</p>
                  </>
                ) : (
                  <p>Make appointment</p>
                )}
              </Button>
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
                  startMonth={today}
                  disabled={{ before: today }}
                />
              </div>
              {date ? (
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-lg font-medium">Choose the time</h3>
                  <div className="flex h-72 w-32 flex-col gap-1 overflow-y-auto">
                    {times.map((timp, index) => {
                      const isBooked =
                        data?.doctorAppointments?.some((appt) => {
                          const apptDate = new Date(appt.appointmentDate);
                          const sameDay =
                            apptDate.toDateString() === date.toDateString();
                          const sameTime =
                            apptDate.getHours() === timp?.getHours() &&
                            apptDate.getMinutes() === timp.getMinutes();
                          return sameDay && sameTime;
                        }) ?? false;
                      const isBookedClient =
                        userAppointments?.data?.some((appt) => {
                          const apptDate = new Date(appt.appointmentDate);
                          const sameDay =
                            apptDate.toDateString() === date.toDateString();
                          const sameTime =
                            apptDate.getHours() === timp?.getHours() &&
                            apptDate.getMinutes() === timp.getMinutes();
                          return sameDay && sameTime;
                        }) ?? false;

                      if (isBooked === false && isBookedClient === false)
                        return (
                          <TimeSlot
                            hour={timp.toTimeString().split("GMT")[0]}
                            key={index}
                            selected={time === timp}
                            onClick={() => {
                              setTime(timp);
                            }}
                          />
                        );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
