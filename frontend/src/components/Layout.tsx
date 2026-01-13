import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/*
  =======================================
  LAYOUT COMPONENT
  - Wraps pages with Navbar & Footer
  =======================================
*/

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
