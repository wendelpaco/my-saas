import { useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { TCheckoutData } from "../@types";

export function useMercadoPago() {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  async function createMercadoPagoCheckout({
    userId,
    userEmail,
    produtct,
  }: TCheckoutData) {
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userEmail, produtct }),
      });

      const data = await response.json();

      router.push(data.initPoint);
    } catch (error) {
      console.log(error);
    }
  }

  return { createMercadoPagoCheckout };
}
