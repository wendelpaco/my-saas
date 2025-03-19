import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import DashboardLayout from "../components/DashboardLayout";

export default async function Payments() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <h1>Página de Pagamentos</h1>
    </DashboardLayout>
  );
}
