"use client"; // Certifique-se de que este código roda no lado do cliente

import Link from "next/link";
import LogoutButton from "./LogoutButton"; // Importe o botão de logout

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <ul className="flex space-x-6">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/plans">Planos</Link>
          </li>
          <li>
            <Link href="/dashboard/payments">Pagamentos</Link>
          </li>
          <li>
            <Link href="/dashboard/payments/refunds">Reembolsos</Link>
          </li>
          {/* Adicione outros links conforme necessário */}
        </ul>

        {/* Botão de Logout no final da navbar */}
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
