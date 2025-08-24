"use client";

import Appointment from "../_components/appointment";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { usePeerContext } from "~/context/peerContext";
import { Loader2 } from "lucide-react";
import type { User } from "~/types/user";

export default function Appointments() {
  const peer = usePeerContext();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = api.appointment.getAppointments.useQuery();
  const appts = data?.data ?? [];
  const user = data?.user;

  const filteredSearch = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return appts;
    return appts.filter((appointment) => {
      const nameToCheck =
        user?.doctor === false
          ? `${appointment.doctor.doctorProfile?.firstName} ${appointment.doctor.doctorProfile?.lastName}`
          : `${appointment.patient.patientProfile?.firstName} ${appointment.patient.patientProfile?.lastName}`;
      const nameToMatch = nameToCheck.toLowerCase().includes(term);
      return nameToMatch;
    });
  }, [appts, search, user?.doctor]);

  const isOngoing = (appointmentStart: Date, duration: number) => {
    const now = new Date();
    const appointmentEnd = new Date(
      appointmentStart.getTime() + duration * 60000,
    );
    return now <= appointmentEnd;
  };

  const isPast = (appointmentStart: Date, duration: number) => {
    const now = new Date();
    const appointmentEnd = new Date(
      appointmentStart.getTime() + duration * 60000,
    );
    return now > appointmentEnd;
  };

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
            placeholder={
              user?.doctor
                ? "Search for an appointment based on patient name..."
                : "Search for an appointment based on doctor name..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />        
        </div>
        <TabsContent value="upcoming">
          {filteredSearch
            .filter((appointment) =>
              isOngoing(
                new Date(appointment.appointmentDate),
                appointment.appointmentDuration,
              ),
            )
            .map((appointment, index) => (
              <Appointment
                key={index}
                appointment={appointment}
                user={user as User}
                type={"upcoming"}
              />
            ))}
        </TabsContent>
        <TabsContent value="past">
          {filteredSearch
            .filter((appointment) =>
              isPast(
                new Date(appointment.appointmentDate),
                appointment.appointmentDuration,
              ),
            )
            .map((appointment, index) => (
              <Appointment
                key={index}
                appointment={appointment}
                user={user as User}
                type={"past"}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
