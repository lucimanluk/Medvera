import { api, HydrateClient } from "~/trpc/server";
import Header from "./_components/header";
export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center">
        <Header />
      </main>
    </HydrateClient>
  );
}
