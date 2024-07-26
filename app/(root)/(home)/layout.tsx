import React from "react";
import { Metadata } from "next";
import { Navbar, Sidebar } from "@/components/elements";

export const metadata: Metadata = {
  title: "GSpace",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}

export default HomeLayout;
