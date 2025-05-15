import Header from "./_components/header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen min-w-full flex-row gap-4">
      <Header />
      {children}
    </main>
  );
}
