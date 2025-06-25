"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import PopoverFilterModal from "./_components/popoverFilterModal";
import SelectorFilter from "../finddoctor/_components/selectorFilter";
import { Input } from "~/components/ui/input";
import * as React from "react";
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
import { Loader2, FilePlus } from "lucide-react";
import PrescriptionCard from "./_components/prescriptionCard";
import { TabsContent } from "@radix-ui/react-tabs";

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
  const { data, isLoading, error } =
    api.prescription.getPrescriptions.useQuery();
  const prescriptions = data?.data ?? [];
  const user = data?.user;
  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);
  const [val, setVal] = React.useState("All specialisations");
  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [value1, setValue1] = React.useState("All specialisations");
  const [value2, setValue2] = React.useState("");

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
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Prescriptions</span>
        <span className="text-base text-gray-400">See your prescriptions</span>
      </div>
      <Tabs defaultValue="ongoing" className="w-full">
        <div className="flex flex-row items-center justify-between">
          <TabsList>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          {user?.doctor ? (
            <Dialog
              onOpenChange={() => {
                setOp(false);
                setVal("All specialisations");
              }}
            >
              <form>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
                    <FilePlus />
                    New prescription
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create prescription</DialogTitle>
                    <DialogDescription>
                      Create prescriptrions for patients that you're conncted
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
                    <div className="flex flex-col gap-2">
                      <Label>Medication</Label>
                      <Input placeholder="Eg: paracetamol" />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                      <div className="flex flex-col gap-2">
                        <Label>Dosage</Label>
                        <Input placeholder="Eg: 10mg" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Frequency</Label>
                        <Input placeholder="Eg: thrice a day" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Quantity</Label>
                        <Input placeholder="Eg: one tablet" />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="flex w-1/2 flex-col gap-2">
                        <Label>Starting date</Label>
                        <Input type="date" />
                      </div>
                      <div className="flex w-1/2 flex-col gap-2">
                        <Label>Ending date</Label>
                        <Input type="date" />
                      </div>
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
        <TabsContent value="ongoing">
          {prescriptions.map((prescription, index) => (
            <PrescriptionCard props={prescription} key={index} user={user!} />
          ))}
        </TabsContent>
        <TabsContent value="past">hallo</TabsContent>
      </Tabs>
    </div>
  );
}
