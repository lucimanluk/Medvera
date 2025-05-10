import Header from "./_components/header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
    </main>
  );
}
