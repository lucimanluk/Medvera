"use client";

import Appointment from "../_components/appointment";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import SelectorFilter from "../finddoctor/_components/selectorFilter";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import * as React from "react";
import { api } from "~/trpc/react";
import { usePeerContext } from "~/context/peerContext";
import { Loader2 } from "lucide-react";

const appointment_types = ["Live and video", "Video", "Live"];

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
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");
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
      <div className="flex flex-row items-center justify-between">
        <Tabs defaultValue="upcoming" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
        {user?.doctor === false ? (
          <Link href="/finddoctor">
            <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
              New appointment
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-row items-center gap-2">
        <Input placeholder="Search for an appointment based on doctor's name..." />
        <PopoverFilter
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          frameworks={frameworks}
        />
        <PopoverFilter
          open={open1}
          setOpen={setOpen1}
          value={value1}
          setValue={setValue1}
          frameworks={frameworks}
        />
      </div>
    </div>
  );
}
