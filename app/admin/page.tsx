// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Automatically send anyone visiting /admin to /admin/dashboard
  redirect("/admin/dashboard");
}