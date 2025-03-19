import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendPaymentConfirmation } from "@/app/lib/email";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email; // Os metadados do Mercado Pago são convertidos para snake_case
  const testeId = metadata.teste_id; // Os metadados do Mercado Pago são convertidos para snake_case
  const price = metadata.price;
  // Faz alguma ação aqui - manda email pro usuario, libera acesso, erc.

  console.log("handleMercadoPagoPayment => ", userEmail, price);
  await sendPaymentConfirmation(userEmail, paymentData.transaction_amount!);

  return;
}
