import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";

export default async function FindDoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (user?.user.doctor === false) {
    return <main className="w-full">{children}</main>;
  } else {
    redirect("/dashboard");
  }
}
