import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const hrefs = [
    "Features",
    "How it works",
    "Specialities",
    "Testimonials",
    "Pricing",
    "FAQ",
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white p-4 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="Medvera logo" width={32} height={32} />
          <span className="text-xl font-bold text-black">Medvera</span>
        </div>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {hrefs.map((href, index) => (
            <li key={index}>
              <Link
                href={`#${href.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-md text-black transition-colors hover:text-blue-600"
              >
                {href}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-3xl">
            Login
          </Button>
          <Button className="rounded-3xl bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
