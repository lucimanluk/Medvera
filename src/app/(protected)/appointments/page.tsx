"use client";

import Appointment from "../_components/appointment";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import SelectorFilter from "../finddoctor/_components/selectorFilter";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { User } from "~/types/user";
import { api } from "~/trpc/react";

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
  const data = api.post.getAppointments.useQuery();
  const appts = data.data?.data ?? [];
  const user = data.data?.user;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");

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
        <Link href="/finddoctor">
          <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            New appointment
          </Button>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Input placeholder="Search for an appointment..." />
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
        <SelectorFilter
          value={value2}
          setValue={setValue2}
          appointments={appointment_types}
        />
      </div>
      {appts.map((item, index) => (
        <Appointment props={item} user={user as User} key={index} />
      ))}
      {appts.length >= 10 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
