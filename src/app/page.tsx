import { api, HydrateClient } from "~/trpc/server";
import Header from "./_components/header";
import HeroSection from "./_components/heroSection";
import HowItWorksSection from "./_components/howItWorksSection";
import SpecialitySection from "./_components/specialitySection";
import FeatureSection from "./_components/featureSection";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen min-w-full flex-col items-center">
        <Header />
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <SpecialitySection />
      </main>
    </HydrateClient>
  );
}
