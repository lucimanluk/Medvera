import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Header from "./_components/header";
import { Card, CardContent } from "~/components/ui/card";
import {
  Clock,
  Wallet,
  ShieldCheck,
  Video,
  CalendarCheck,
  FileText,
  HeartPulse,
  Droplet,
  Brain,
  Baby,
} from "lucide-react";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen min-w-full flex-col items-center">
        <Header />
        <section className="container px-4 py-6 md:py-24 lg:py-16">
          <div className="flex flex-row items-center justify-between">
            <div className="max-w-2/4 space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Healthcare at your fingertips
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Connect with licensed healthcare professionals from the comfort
                of your home. Get the care you need, when you need it.
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
              <img src="/telemedicinePic.jpg" width={500} height={300} />
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center bg-slate-50 py-6 md:py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Why Choose Medvera?
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
                Our telemedicine platform offers numerous advantages over
                traditional in-person visits
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <Clock />
                </div>
                <h3 className="mb-2 text-xl font-bold">Save Time</h3>
                <p className="text-muted-foreground">
                  No travel or waiting rooms. Connect with doctors in minutes
                  from anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <Wallet />
                </div>
                <h3 className="mb-2 text-xl font-bold">Lower Costs</h3>
                <p className="text-muted-foreground">
                  Telemedicine visits often cost less than in-person
                  appointments, with transparent pricing.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <ShieldCheck />
                </div>
                <h3 className="mb-2 text-xl font-bold">Privacy & Security</h3>
                <p className="text-muted-foreground">
                  HIPAA-compliant platform ensures your medical information
                  remains confidential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container py-6 md:py-24 lg:py-16">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3">
            <div className="grid gap-4 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <Video />
                </div>
              </div>
              <h3 className="text-xl font-bold">Video Consultations</h3>
              <p className="text-muted-foreground">
                Face-to-face consultations with healthcare professionals from
                anywhere.
              </p>
            </div>
            <div className="grid gap-4 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <CalendarCheck />
                </div>
              </div>
              <h3 className="text-xl font-bold">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Book appointments that fit your schedule with our easy-to-use
                calendar.
              </p>
            </div>
            <div className="grid gap-4 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <FileText />
                </div>
              </div>
              <h3 className="text-xl font-bold">E-Prescriptions</h3>
              <p className="text-muted-foreground">
                Get prescriptions sent directly to your preferred pharmacy.
              </p>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full bg-slate-50 py-6 md:py-24 lg:py-16"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-4 md:text-xl">
              Getting the healthcare you need has never been easier
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-6 lg:grid-cols-3">
            <div className="grid gap-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Create an account</h3>
              <p className="text-muted-foreground">
                Sign up and complete your medical profile with your health
                history.
              </p>
            </div>
            <div className="grid gap-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Book an appointment</h3>
              <p className="text-muted-foreground">
                Choose a specialist and select a time that works for you.
              </p>
            </div>
            <div className="grid gap-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Receive care</h3>
              <p className="text-muted-foreground">
                Connect with your doctor via video call and get the care you
                need.
              </p>
            </div>
          </div>
        </section>

        <section id="specialties" className="container py-6 md:py-24 lg:py-16">
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
      </main>
    </HydrateClient>
  );
}
