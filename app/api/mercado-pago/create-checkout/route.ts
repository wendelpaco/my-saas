import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";
import { TCheckoutData } from "@/app/@types";

export async function POST(req: NextRequest) {
  const { userId, userEmail, produtct }: TCheckoutData = await req.json();

  try {
    const preference = new Preference(mpClient);

    console.log("iniciando rota de create-checkout");
    console.log(`${process.env.NOTIFICATION_URL}/api/mercado-pago/webhook`);

    const createdPreference = await preference.create({
      body: {
        external_reference: userId,
        metadata: {
          teste_id: userId,
          user_email: userEmail,
          plan: produtct.planId,
          price: produtct.price,
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
            first_name: "Wendel",
            last_name: "Santos",
          } as any,
        }),

        items: [
          {
            id: produtct.planId,
            description: produtct.description,
            title: produtct.title,
            quantity: 1,
            unit_price: 0.01,
            currency_id: "BRL",
            category_id: "category",
          },
        ],
        payment_methods: {
          excluded_payment_types: [{ id: "debit_card" }, { id: "credit_card" }],
          installments: 12,
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`,
        },
        notification_url: `${process.env.NOTIFICATION_URL}/api/mercado-pago/webhook`,
        binary_mode: true,
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
