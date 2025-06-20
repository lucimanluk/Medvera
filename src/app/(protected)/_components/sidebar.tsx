"use client";

import {
  Home,
  UserSearch,
  Calendar,
  UserPlus,
  LogOut,
  User,
  Pill,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { signOut } from "~/lib/auth-client";
import { useRouter } from "next/navigation";
import type { User as UserType } from "~/types/user";

export default function Sidebar({user} : {user: UserType}) {
  const pathname = usePathname();
  const router = useRouter();
  const links = [
    { title: "Dashboard", icon: Home },
    { title: "Find Doctor", icon: UserSearch },
    { title: "Appointments", icon: Calendar },
    { title: "Prescriptions", icon: Pill },
    { title: "Connections", icon: UserPlus },
    { title: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 flex h-screen w-1/4 flex-col justify-between bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-6">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Medvera logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold text-black">Medvera</span>
          </div>
        </Link>
        <ul className="flex flex-col gap-4 text-sm font-medium">
          {links.map((link, index) =>
            user.doctor === true &&
            link.title === "Find Doctor" ? null : (
              <li
                key={index}
                className={cn(
                  "rounded-xl py-2 pl-2",
                  pathname.includes(
                    link.title.toLowerCase().replace(/\s+/g, ""),
                  ) == true
                    ? "bg-gray-200"
                    : null,
                )}
              >
                <Link
                  href={`/${link.title.toLowerCase().replace(/\s+/g, "")}`}
                  className="text-md flex flex-row items-center gap-1 text-black transition-colors hover:text-blue-600"
                >
                  {<link.icon width={16} height={16} />}
                  {link.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="flex flex-row justify-start">
            <LogOut />
            <span>Sign out</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Sign out from the current device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#2F80ED]"
              onClick={async () =>
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                    },
                  },
                })
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
