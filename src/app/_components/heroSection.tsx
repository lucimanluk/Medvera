import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="container px-4 py-6 md:py-24 lg:py-16">
      <div className="flex flex-row items-center justify-between">
        <div className="max-w-2/4 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Healthcare at your fingertips
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Connect with licensed healthcare professionals from the comfort of
            your home. Get the care you need, when you need it.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-3xl bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              >
                Get Started
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="rounded-3xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/telemedicinePic.jpg"
            width={500}
            height={300}
            alt="Online consultation"
          />
        </div>
      </div>
    </section>
  );
}
