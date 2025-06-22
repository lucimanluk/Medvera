"use client";

import React, { Suspense } from "react";
import Sidebar from "./sidebar";
import { PeerContextProvider, usePeerContext } from "~/context/peerContext";
import CallOverlay from "./callOverlay";
import { ClientToaster } from "./clientToaster";
import type { User as UserType } from "~/types/user";
import { Loader2 } from "lucide-react";

export default function PeerClientWrapper({
  userId,
  children,
  user,
}: {
  userId: string;
  children: React.ReactNode;
  user: UserType;
}) {
  return (
    <PeerContextProvider id={userId}>
      <InnerLayout user={user}>{children}</InnerLayout>
    </PeerContextProvider>
  );
}

function InnerLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserType;
}) {
  const { inCall } = usePeerContext();

  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen w-full flex-row items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <main className="flex min-h-screen min-w-full flex-row gap-4">
          <Sidebar user={user} />
          {children}
        </main>
      </Suspense>
      {inCall && <CallOverlay />}
      <ClientToaster />
    </>
  );
}
