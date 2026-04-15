import { redirect } from "next/navigation";

const AdminIndexPage = () => {
  redirect("/admin/dashboard");
};

export default AdminIndexPage;
