export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-12 items-center justify-center h-[calc(100vh-24.8125rem)] ">
      {children}
    </section>
  );
}
