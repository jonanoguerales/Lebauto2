import Footer from "@/components/Footer";
import Navbar from "@/components/Nvbar";
import "@/global.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section>{children}</section>
      <Footer />
    </>
  );
}
