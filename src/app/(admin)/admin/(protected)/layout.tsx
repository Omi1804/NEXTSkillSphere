import AdminShell from "@/components/Admin/AdminShell";
import { getCurrentAdmin } from "@/lib/getCurrentAdmin";
import { HeaderUser } from "@/types/header.types";
import { redirect } from "next/navigation";

const ProtectedAdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const safeAdmin: HeaderUser = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  return <AdminShell admin={safeAdmin}>{children}</AdminShell>;
};

export default ProtectedAdminLayout;
