import React from "react";
import { Metadata } from "next";
import StreamClientProvider from "@/providers/stream-client-provider";

export const metadata: Metadata = {
  title: "GSpace",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
}

export default RootLayout;
