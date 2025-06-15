export default async function CallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">{children}</main>

  );
}
