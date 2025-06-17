"use client";

import Appointment from "../_components/appointment";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import PopoverFilterModal from "./_components/popoverFilterModal";
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
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
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

export default function Prescriptions() {
  const data = api.prescription.getDashboardPrescriptions.useQuery();
  const prescriptions = data.data?.data ?? [];
  const user = data.data?.user;
  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);
  const [val, setVal] = React.useState("All specialisations");
  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");
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
        {user?.doctor ? (
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
                  New prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create prescription</DialogTitle>
                  <DialogDescription>
                    Create prescriptrions for your patients that you're conncted
                    to.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Patient name</Label>
                    <PopoverFilterModal
                      open={op}
                      setOpen={setOp}
                      value={val}
                      setValue={setVal}
                      frameworks={frameworks}
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                    <form className="flex flex-col gap-2">
                      <Label>Dosage</Label>
                      <Input placeholder="Eg: 10mg" />
                    </form>
                    <form className="flex flex-col gap-2">
                      <Label>Frequency</Label>
                      <Input placeholder="Eg: thrice a day" />
                    </form>
                    <form className="flex flex-col gap-2">
                      <Label>Quantity</Label>
                      <Input placeholder="Eg: one tablet" />
                    </form>
                  </div>
                  <div className="flex flex-row gap-2">
                    <form className="flex w-1/2 flex-col gap-2">
                      <Label>Starting date</Label>
                      <Input type="date" />
                    </form>
                    <form className="flex w-1/2 flex-col gap-2">
                      <Label>Ending date</Label>
                      <Input type="date" />
                    </form>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Instructions</Label>
                    <Textarea placeholder="Instructions for the patient..." />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={loading}>
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <p>Cancel</p>
                      )}
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                    disabled={loading}
                  >
                    Create prescription
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        ) : null}
      </div>
      <div className="flex flex-row items-center gap-2">
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
      </div>

      {prescriptions.length >= 10 ? (
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
