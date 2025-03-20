"use client";

import { useMercadoPago } from "./hooks/useMercadoPago";
import { sendPaymentConfirmation } from "./lib/email";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>V1.0.0</h1>
    </div>
  );
}
