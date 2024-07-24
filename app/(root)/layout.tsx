import React from "react";
import StreamClientProvider from "@/providers/stream-client-provider";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
}

export default RootLayout;
