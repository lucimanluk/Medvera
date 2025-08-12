"use client";
import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import DoctorProfile from "./_components/doctorProfile";

import PatientProfile from "./_components/patientProfile";

export default function Profile() {
  const { data, isLoading, error } = api.user.get3.useQuery();
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div className="m-auto">Error...</div>;
  }
  if (data?.doctor === false) {
    return <PatientProfile data={data} />;
  } else if (data?.doctor === true) {
    return <DoctorProfile data={data} />;
  }
}
