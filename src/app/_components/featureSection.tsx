import {
  Clock,
  Wallet,
  ShieldCheck,
  Video,
  CalendarCheck,
  FileText,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="features"
      className="flex w-full items-center justify-center py-6 md:py-16"
    >
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Why Choose Medvera?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
            Our telemedicine platform offers numerous advantages over
            traditional in-person visits, always prioristing the experience of
            our users.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <Clock />
            </div>
            <h3 className="mb-2 text-xl font-bold">Save Time</h3>
            <p className="text-muted-foreground">
              No travel or waiting rooms. Connect with doctors in minutes from
              anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <Wallet />
            </div>
            <h3 className="mb-2 text-xl font-bold">Lower Costs</h3>
            <p className="text-muted-foreground">
              Telemedicine visits often cost less than in-person appointments,
              with transparent pricing.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <ShieldCheck />
            </div>
            <h3 className="mb-2 text-xl font-bold">Privacy & Security</h3>
            <p className="text-muted-foreground">
              HIPAA-compliant platform ensures your medical information remains
              confidential.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <Video />
            </div>
            <h3 className="mb-2 text-xl font-bold">Video Consultations</h3>
            <p className="text-muted-foreground">
              Face-to-face consultations with healthcare professionals from
              anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <CalendarCheck />
            </div>
            <h3 className="mb-2 text-xl font-bold">Easy Scheduling</h3>
            <p className="text-muted-foreground">
              Book appointments that fit your schedule with our easy-to-use
              calendar.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <FileText />
            </div>
            <h3 className="mb-2 text-xl font-bold">E-Prescriptions</h3>
            <p className="text-muted-foreground">
              Get prescriptions sent directly to your preferred pharmacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
