"use client";

import Appointment from "../_components/appointment";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import type { DoctorProfile } from "@prisma/client";
import type { PatientProfile } from "@prisma/client";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";
import { usePeerContext } from "~/context/peerContext";
import { Loader2 } from "lucide-react";
import type { User } from "~/types/user";

interface Framework {
  value: string;
  label: string;
}

const frameworks: Framework[] = [
  {
    value: "All specialisations",
    label: "All specialisations",
  },
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function Appointments() {
  const peer = usePeerContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All specialisations");
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = api.appointment.getAppointments.useQuery();
  const appts = data?.data ?? [];
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return;
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Appointments</span>
        <span className="text-base text-gray-400">
          Manage your healthcare appointments
        </span>
      </div>
      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex flex-row items-center justify-between">
          <TabsList>
            <TabsTrigger
              value="upcoming"
              onClick={() => {
                setSearch("");
              }}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="past"
              onClick={() => {
                setSearch("");
              }}
            >
              Past
            </TabsTrigger>
          </TabsList>
          {user?.doctor === false ? (
            <Link href="/finddoctor">
              <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
                New appointment
              </Button>
            </Link>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Input
            placeholder="Search for an appointment based on doctor's name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {user?.doctor === false ? (
            <PopoverFilter
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
              frameworks={frameworks}
            />
          ) : null}
        </div>
        <TabsContent value="upcoming">
          {appts.map((appointment, index) => (
            <Appointment
              key={index}
              appointment={appointment}
              user={user as User}
              type={"upcoming"}
              profile={
                user?.doctor
                  ? (appointment.patient.patientProfile as PatientProfile)
                  : (appointment.doctor.doctorProfile as DoctorProfile)
              }
              price={
                appointment.doctor.doctorProfile?.appointmentPrice as number
              }
              duration={
                appointment.doctor.doctorProfile?.appointmentDuration as number
              }
            />
          ))}
        </TabsContent>
        <TabsContent value="past">
          {appts.map((appointment, index) => (
            <Appointment
              key={index}
              appointment={appointment}
              user={user as User}
              type={"past"}
              profile={
                user?.doctor
                  ? (appointment.patient.patientProfile as PatientProfile)
                  : (appointment.doctor.doctorProfile as DoctorProfile)
              }
              price={
                appointment.doctor.doctorProfile?.appointmentPrice as number
              }
              duration={
                appointment.doctor.doctorProfile?.appointmentDuration as number
              }
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
