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
import { toast } from "sonner";

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

const times = slots.map((slot) => {
  const [h = 0, m = 0] = slot.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
});

export default function Doctor() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<Date | undefined>();

  useEffect(() => {
    setTime(undefined);
  }, [date]);

  const rawId = params.doctor;
  const id = typeof rawId === "string" ? rawId : "";

  const utils = api.useUtils();
  const mutation = api.appointment.createAppointment.useMutation({
    onSuccess: () => {
      toast("Successfully created appointment!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      utils.appointment.getAppointments.invalidate();
      utils.appointment.getDashboardAppointments.invalidate();
      utils.doctor.getPage.invalidate({ doctor: id });
    },
    onError: () => toast("Error"),
    onMutate() {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
      setDate(undefined);
    },
  });
  const { data, isLoading, error } = api.doctor.getPage.useQuery(
    { doctor: id },
    { enabled: !!id },
  );

  console.log(data?.doctorProfile);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  if (data === null) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <span>ERROR: COULDN'T FIND DOCTOR</span>
        <Link href="/dashboard">
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
              <img
                src={data?.image || "/default_pfp.jpg"}
                className="h-20 w-20 overflow-hidden rounded-full"
              />
              <div className="flex flex-col gap-1">
                <CardTitle>Dr. {data?.name}</CardTitle>
                <CardDescription className="flex flex-col">
                  <span>{data?.doctorProfile?.specialization}</span>
                  <span>
                    {data?.email}
                    {", +"}
                    {data?.doctorProfile?.cabinetPhone}
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
                disabled={!date || !time || loading === true}
                onClick={() => {
                  if (!date || !time) return;
                  const appointmentDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    time.getHours(),
                    time.getMinutes(),
                  );
                  mutation.mutate({ id, appointmentDate });
                }}
              >
                {loading === true ? (
                  <>
                    <Loader2 className="animate-spin" /> <p>Make appointment</p>
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
                  startMonth={new Date()}
                  disabled={{ before: new Date() }}
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
                      if (isBooked === false)
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
