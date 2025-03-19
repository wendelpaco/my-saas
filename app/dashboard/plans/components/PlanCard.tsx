"use client";

import { useSession } from "next-auth/react";
import { TProduct } from "@/app/@types";
import { useMercadoPago } from "@/app/hooks/useMercadoPago";
import { useState } from "react";

export default function PlanCard({
  planId,
  title,
  description,
  price,
  highlighted,
}: TProduct & { highlighted?: boolean }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const { createMercadoPagoCheckout } = useMercadoPago();

  const handlePayment = async () => {
    setLoading(true);
    try {
      createMercadoPagoCheckout({
        produtct: { planId, title, description },
        userId: session?.user.id!,
        userEmail: session?.user?.email!,
      });
    } catch (error) {
      console.error("Erro ao processar pagamento", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border p-6 rounded-lg text-center shadow-md transition-all duration-300
        ${
          highlighted
            ? "border-yellow-500 bg-yellow-100 scale-105 shadow-lg"
            : "border-gray-300 bg-white"
        }
      `}
    >
      {highlighted && (
        <span className="px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-full mb-2 inline-block">
          Mais Popular
        </span>
      )}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-lg font-semibold text-gray-900 mt-2">R$ {price}</p>
      <button
        onClick={() =>
          createMercadoPagoCheckout({
            produtct: { planId, title, description },
            userId: session?.user.id!,
            userEmail: session?.user?.email!,
          })
        }
        disabled={loading}
        className={`mt-4 px-5 py-2 rounded-md text-white 
          ${
            highlighted
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }
        `}
      >
        {loading ? "Processando..." : "Assinar"}
      </button>
    </div>
  );
}
