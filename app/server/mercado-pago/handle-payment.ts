import "server-only";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendPaymentConfirmation } from "@/app/lib/email";
import prisma from "@/app/lib/prisma";

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
  const { teste_id } = paymentData.metadata;

  const user = await prisma.user.findUnique({
    where: {
      id: teste_id, // ID do usuário logado que você passou no metadata
    },
  });

  if (!user) {
    throw new Error(`Usuário com ID ${teste_id} não encontrado`);
  }

  await prisma.payment.create({
    data: {
      userId: user.id,
      transactionId: paymentData.id?.toString()!,
      status: paymentData.status!,
      amount: paymentData.transaction_amount!,
      paymentMethod: paymentData.payment_method_id!,
    },
  });

  // Enviar e-mail para o usuário
  // await sendPaymentConfirmation(userEmail, paymentData.transaction_amount!);

  // Enviar os dados do pagamento para o webhook
  await sendToWebhook(paymentData);

  return;
}
