import Footer from "@/components/footer";
import Navbar from "@/components/nvbar";
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
