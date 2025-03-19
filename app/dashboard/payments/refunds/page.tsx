import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DashboardLayout from "../../components/DashboardLayout";

// Usando SSR para verificar a autenticação
export default async function Refunds() {
  const session = await getServerSession();

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <h1>Página de Reembolso do Cliente</h1>
    </DashboardLayout>
  );
}
