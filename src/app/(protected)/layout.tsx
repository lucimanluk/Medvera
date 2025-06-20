import Sidebar from "./_components/sidebar";
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { PeerContextProvider } from "~/context/peerContext";
import { ClientToaster } from "./_components/clientToaster";
import CallOverlay from "./_components/callOverlay";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signIn");
  } else {
    return (
      <PeerContextProvider id={session.user.id}>
        <Suspense fallback={<div className="w-1/4 p-4">Loading…</div>}>
          <main className="flex min-h-screen min-w-full flex-row gap-4">
            <Sidebar user={session.user} />
            {children}
          </main>
        </Suspense>
        {/*<CallOverlay />*/}
        <ClientToaster />
      </PeerContextProvider>
    );
  }
}
