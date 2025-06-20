import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import PeerClientWrapper from "./_components/peerClientWrapper";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signIn");

  return (
    <PeerClientWrapper userId={session.user.id} user={session.user}>
      {children}
    </PeerClientWrapper>
  );
}
