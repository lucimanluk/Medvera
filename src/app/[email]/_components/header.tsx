import {
  Home,
  Video,
  UserSearch,
  Calendar,
  MessageSquare,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const links = [
    { title: "Dashboard", icon: Home },
    { title: "Video Calls", icon: Video },
    { title: "Find Doctor", icon: UserSearch },
    { title: "Appointments", icon: Calendar },
    { title: "Chat", icon: MessageSquare },
    { title: "Medical Records", icon: FileText },
  ];
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white p-4 shadow-sm">
      <div className="flex flex-row items-center justify-between">
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
        <ul className="flex items-center gap-6 text-sm font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={`/lucimanluk4000@gmail.com/${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-md flex flex-row items-center gap-1 text-black transition-colors hover:text-blue-600"
              >
                {<link.icon width={16} height={16} />}
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 rounded-4xl bg-red-600 p-2"></div>
      </div>
    </nav>
  );
}
