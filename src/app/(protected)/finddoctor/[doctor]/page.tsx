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

export default function Doctor() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime("");
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
    },
    onError: () => toast("Error"),
    onMutate(variables) {
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
        <Card className="flex h-full w-3/4 flex-col border-none p-4 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <div className="flex flex-row items-center gap-2">
              <div className="h-20 w-20 rounded-full bg-black" />
              <div className="flex flex-col gap-2">
                <CardTitle>Dr. {data?.name}</CardTitle>
                <CardDescription>specialitate</CardDescription>
              </div>
            </div>
            <div className="flex flex-col p-2">
              <span>Date: {date?.toDateString()}</span>
              <span>Time: {time}</span>
              <Button
                className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                disabled={!date || !time || loading === true}
                onClick={() => {
                  mutation.mutate({ id });
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
                    {slots.map((timp, index) => (
                      <TimeSlot
                        hour={timp}
                        key={index}
                        selected={time === timp}
                        onClick={() => {
                          setTime(timp);
                        }}
                      />
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
}
