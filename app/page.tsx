"use client";

import { useMercadoPago } from "./hooks/useMercadoPago";

export default function Home() {
  const { createMercadoPagoCheckout } = useMercadoPago();
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>teste</h1>
      {/* <button
        onClick={() =>
          createMercadoPagoCheckout({
            userId: "123",
            userEmail: "loveyuuqr@gmail.com",
            planId: "23321",
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comprar
      </button> */}
    </div>
  );
}
