"use client";

import Appointment from "../_components/appointment";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import SelectorFilter from "../finddoctor/_components/selectorFilter";
import { Input } from "~/components/ui/input";
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

export default function Prescriptions() {
  const data = api.post.getAppointments.useQuery();
  const appts = data?.data ?? [];
  {
    /*const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");*/
  }
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Prescriptions</span>
        <span className="text-base text-gray-400">See your prescriptions</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Tabs defaultValue="ongoing" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/*<div className="flex flex-row items-center gap-2">
        <Input placeholder="Search for a prescription..." />
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
      </div>*/}
      {appts.map((appointment, index) => (
        <Appointment props={appointment} key={index} />
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
