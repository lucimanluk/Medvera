import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { HeartPulse, Droplet, Brain, Baby } from "lucide-react";

export default function SpecialitySection() {
  return (
    <section id="specialities" className="container py-6 md:py-24 lg:py-16">
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Medical Specialties
        </h2>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Our platform connects you with specialists across numerous medical
          fields
        </p>
      </div>
      <div className="ml-2 flex flex-row gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <HeartPulse />
            </div>
            <h3 className="mb-2 text-xl font-bold">Cardiology</h3>
            <p className="text-muted-foreground">
              Heart health, blood pressure management, and cardiac care
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <Droplet />
            </div>
            <h3 className="mb-2 text-xl font-bold">Dermatology</h3>
            <p className="text-muted-foreground">
              Skin conditions, acne treatment, and dermatological care
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <Brain />
            </div>
            <h3 className="mb-2 text-xl font-bold">Psychiatry</h3>
            <p className="text-muted-foreground">
              Mental health support, therapy, and medication management
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <Baby />
            </div>
            <h3 className="mb-2 text-xl font-bold">Pediatrics</h3>
            <p className="text-muted-foreground">
              Child healthcare, development monitoring, and pediatric advice
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Link href="/find-doctor">
          <Button className="rounded-3xl bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            View All Specialties
          </Button>
        </Link>
      </div>
    </section>
  );
}
