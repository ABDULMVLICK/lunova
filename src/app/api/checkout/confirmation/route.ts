import { NextResponse } from "next/server";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
import { FROM_EMAIL, getResend, isResendConfigured } from "@/lib/resend";

export const runtime = "nodejs";

type ConfirmationBody = {
  orderId: string;
  email: string;
  firstName: string;
  items: Array<{
    name: string;
    colorLabel: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
  };
};

export async function POST(req: Request) {
  // Mode démo si Resend pas configuré
  if (!isResendConfigured()) {
    return NextResponse.json({
      demo: true,
      message:
        "Resend non configuré (RESEND_API_KEY manquante). Email non envoyé.",
    });
  }

  let body: ConfirmationBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  if (!body.email || !body.orderId) {
    return NextResponse.json(
      { error: "email et orderId requis." },
      { status: 400 }
    );
  }

  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunova-site.vercel.app";

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: body.email,
      subject: `Ta commande Lunova est confirmée — n° ${body.orderId}`,
      react: OrderConfirmationEmail({
        orderId: body.orderId,
        firstName: body.firstName,
        items: body.items,
        total: body.total,
        shipping: body.shipping,
        siteUrl,
      }),
    });

    if (error) {
      console.error("[Resend] send error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ sent: true, id: data?.id });
  } catch (err) {
    console.error("[Resend] unexpected error:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
