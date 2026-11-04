"use client";

import { useState, useEffect } from "react";
import { Session, createClient } from "@supabase/supabase-js";
import AdminSidebar from "@/app/admin/components/AdminSidebar";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getActiveSession() {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
    }

    getActiveSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-900">
      <AdminSidebar />
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