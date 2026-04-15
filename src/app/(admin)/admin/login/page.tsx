import AdminLoginForm from "@/components/Admin/AdminLoginForm";
import { getCurrentAdmin } from "@/lib/getCurrentAdmin";
import { redirect } from "next/navigation";

const AdminLoginPage = async () => {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
};

export default AdminLoginPage;
