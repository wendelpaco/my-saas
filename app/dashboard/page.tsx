import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import DashboardLayout from "./components/DashboardLayout";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <h1>Bem-vindo ao sistema, {session.user?.email}!</h1>
      <p>Aqui você pode gerenciar suas informações.</p>
    </DashboardLayout>
  );
}
