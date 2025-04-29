export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-6 md:py-24 lg:py-16">
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
            Sign up and complete your medical profile with your health history.
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
            Connect with your doctor via video call and get the care you need.
          </p>
        </div>
      </div>
    </section>
  );
}
