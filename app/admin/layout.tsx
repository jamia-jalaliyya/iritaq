// app/admin/layout.tsx
import AuthProvider from "@/app/admin/components/AuthProvider";
import AdminLayoutContent from "@/app/admin/components/AdminLayoutContent";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}