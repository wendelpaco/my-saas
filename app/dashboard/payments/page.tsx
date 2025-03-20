import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";
import prisma from "@/app/lib/prisma";

export default async function Payments() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/auth/login");
  }

  // Buscar usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }, // Apenas pegamos o ID
  });

  if (!user) return redirect("/auth/login");

  // Buscar últimos pagamentos do usuário
  const payments = await prisma.payment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }, // Ordenar pelos mais recentes
    take: 10, // Pega apenas os últimos 10 pagamentos
  });

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Meus Pagamentos</h1>

      {payments.length === 0 ? (
        <p>Você ainda não realizou nenhum pagamento.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Data</th>
              <th className="border p-2">Tipo de Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="text-center">
                <td className="border p-2">{payment.transactionId}</td>
                <td className="border p-2">R$ {payment.amount.toFixed(2)}</td>
                <td className="border p-2">{payment.status}</td>
                <td className="border p-2">
                  {new Date(payment.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="border p-2">{payment.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}
