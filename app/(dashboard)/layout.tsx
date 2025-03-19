import "@/global.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
        {children}
    </section>
  );
}
