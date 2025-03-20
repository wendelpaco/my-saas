import "server-only";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendPaymentConfirmation } from "@/app/lib/email";

const webhookUrl = "https://tangy-musician-47.webhook.cool";

async function sendToWebhook(paymentData: PaymentResponse) {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`Erro no webhook: ${response.statusText}`);
    }

    console.log("Dados enviados ao Webhook com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar dados ao Webhook:", error);
  }
}

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email;
  const price = metadata.price;

  console.log("handleMercadoPagoPayment => ", userEmail, price);

  // Enviar e-mail para o usuário
  // await sendPaymentConfirmation(userEmail, paymentData.transaction_amount!);

  // Enviar os dados do pagamento para o webhook
  await sendToWebhook(paymentData);

  return;
}
