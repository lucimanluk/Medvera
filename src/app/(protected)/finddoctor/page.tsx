"use client";

import { Loader2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import DoctorCard from "./_components/doctorCard";
import { useState, useMemo } from "react";
import PopoverFilter from "./_components/popoverFilter";
import { frameworks } from "~/types/framework";
import { api } from "~/trpc/react";

export default function FindDoctor() {
  const {
    data: doctorsResponse,
    isLoading: doctorLoading,
    error: doctorsError,
  } = api.doctor.getDoctors.useQuery(undefined, {
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All specialisations");

  const doctors = doctorsResponse?.data ?? [];
  const user = doctorsResponse?.user;

  const filteredSearch = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return doctors;
    return doctors.filter((doctor) =>
      `${doctor.doctorProfile?.firstName?.toLowerCase()} ${doctor.doctorProfile?.lastName?.toLowerCase()}`.includes(
        term,
      ),
    );
  }, [doctors, search]);

  if (doctorLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (doctorsError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Find doctor</span>
        <span className="text-base text-gray-400">
          Find the right doctor for your needs
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Input
          placeholder="Search for a doctor..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <PopoverFilter
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          frameworks={frameworks}
        />
      </div>
      {filteredSearch.map((doctor, index) => (
        <DoctorCard
          doctor={doctor}
          key={index}
          user={user!}
          doctorConnection={doctor.doctorConnections}
        />
      ))}
    </div>
  );
}
