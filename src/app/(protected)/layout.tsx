import Sidebar from "./_components/sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen min-w-full flex-row gap-4">
      <Sidebar />
      {children}
    </main>
  );
}
