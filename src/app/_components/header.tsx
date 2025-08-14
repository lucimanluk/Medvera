import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const hrefs = ["Features", "How it works", "Specialities"];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white p-4 shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Medvera logo" width={50} height={50} />
            <span className="text-xl font-bold text-black">Medvera</span>
          </div>
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {hrefs.map((href, index) => (
            <li key={index}>
              <Link
                href={`/#${href.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-md text-black transition-colors hover:text-blue-600"
              >
                {href}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/signIn">
            <Button variant="outline" className="rounded-3xl">
              Sign in
            </Button>
          </Link>
          <Link href="/signUp">
            <Button className="rounded-3xl bg-[#2F80ED] text-white hover:bg-[#1366d6]">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
