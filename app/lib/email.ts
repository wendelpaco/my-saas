"use server";

import nodemailer from "nodemailer";

export async function sendPaymentConfirmation(email: string, amount: number) {
  try {
    // Validação básica dos parâmetros
    if (!email || !amount) {
      throw new Error("E-mail e valor são obrigatórios.");
    }
    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // SSL para porta 465, STARTTLS para outras
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Para evitar erros com certificados SSL autoassinados
      },
    });

    // Envio do e-mail
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Pagamento Aprovado",
      text: `Seu pagamento de R$ ${amount.toFixed(
        2
      )} foi aprovado com sucesso!`,
      html: `<p>Seu pagamento de <strong>R$ ${amount.toFixed(
        2
      )}</strong> foi aprovado com sucesso!</p>`,
    });

    console.log("E-mail enviado:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return { error: "Falha ao enviar e-mail" };
  }
}
