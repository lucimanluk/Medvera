import Sidebar from "./_components/sidebar";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { PeerContextProvider } from "~/context/peerContext";
import { ClientToaster } from "./_components/clientToaster";

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
      <main className="flex min-h-screen min-w-full flex-row gap-4">
        <PeerContextProvider id={session.user.id}>
          <Sidebar />
          {children}
          <ClientToaster />
        </PeerContextProvider>
      </main>
    );
  }
}
