import ContactUs from "@/components/layout/ContactUs";
import Footer from "@/components/layout/Footer";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import dynamic from "next/dynamic";
import "./globals.css";

const Header = dynamic(() => import("@/components/layout/Header"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-gray-100 font-graphik">
        <Header />
        {children}
        <ContactUs />
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
