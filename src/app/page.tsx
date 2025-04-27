import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Header from "./_components/header";
import { Card, CardContent } from "~/components/ui/card";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen min-w-full flex-col items-center">
        <Header />
        <section className="container py-12 md:py-24 lg:py-32">
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

        <section className="flex w-full items-center justify-center bg-slate-50 py-12 md:py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Why Choose MediConnect?
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
                Our telemedicine platform offers numerous advantages over
                traditional in-person visits
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Save Time</h3>
                <p className="text-muted-foreground">
                  No travel or waiting rooms. Connect with doctors in minutes
                  from anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                    <path d="M12 12 2.1 9.1a10 10 0 0 0 9.8 12.9L12 12Z" />
                    <path d="M12 12 2.1 14.9a10 10 0 0 1 9.8-12.9L12 12Z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Lower Costs</h3>
                <p className="text-muted-foreground">
                  Telemedicine visits often cost less than in-person
                  appointments, with transparent pricing.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
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

        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="grid gap-4 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                  </svg>
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
          className="w-full bg-slate-50 py-12 md:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-4 md:text-xl">
              Getting the healthcare you need has never been easier
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
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

        <section id="specialties" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Medical Specialties
            </h2>
            <p className="text-muted-foreground mt-4 md:text-xl">
              Our platform connects you with specialists across numerous medical
              fields
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600"
                  >
                    <path d="m16 6 4 14" />
                    <path d="M12 6v14" />
                    <path d="M8 8v12" />
                    <path d="M4 4v16" />
                  </svg>
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
              <Button className="bg-teal-600 hover:bg-teal-700">
                View All Specialties
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
