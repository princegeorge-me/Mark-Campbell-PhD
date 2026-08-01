import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Dashboard from "./_components/Dashboard";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return <Dashboard />;
}
