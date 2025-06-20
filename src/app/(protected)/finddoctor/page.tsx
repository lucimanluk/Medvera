"use client";

import { Input } from "~/components/ui/input";
import DoctorCard from "./_components/doctorCard";
import * as React from "react";
import PopoverFilter from "./_components/popoverFilter";
import SelectorFilter from "./_components/selectorFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { frameworks } from "~/types/framework";

const appointment_types = ["Live and video", "Video", "Live"];

export default function FindDoctor() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Find doctor</span>
        <span className="text-base text-gray-400">
          Find the right doctor for your needs
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Input placeholder="Search for a doctor..." />
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
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
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
    </div>
  );
}
