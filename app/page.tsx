"use client";

import { useMercadoPago } from "./hooks/useMercadoPago";
import { sendPaymentConfirmation } from "./lib/email";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>teste</h1>
      <button
        onClick={async () =>
          await sendPaymentConfirmation("wendelpaco@gmail.com", 0.01)
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comprar
      </button>
    </div>
  );
}
