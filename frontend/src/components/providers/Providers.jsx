"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <div className="page-shell min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
