// components/admin/AdminLayoutContent.tsx
"use client";

import { useSession } from "next-auth/react";
import AdminSidebar from "@/app/admin/components/AdminSidebar";

export default function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar renders conditionally inside itself */}
      <AdminSidebar />

      {/* Dynamic left padding applied only when user is logged in */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all ${
          session ? "md:pl-64" : "pl-0"
        }`}
      >
        <main className="flex-1 w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}