import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "~/server/db";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const body = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET_APPTS!,
    );
  } catch (err: any) {
    console.error("Webhook signature failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { doctorId, patientId, appointmentDateISO, appointmentPrice, appointmentDuration } = session.metadata ?? {};

    if (doctorId && patientId && appointmentDateISO) {
      const exists = await db.appointment.findFirst({
        where: {
          doctorId,
          patientId,
          appointmentDate: new Date(appointmentDateISO),
        },
      });
      if (!exists) {
        await db.appointment.create({
          data: {
            doctorId: doctorId,
            patientId: patientId,
            appointmentDate: new Date(appointmentDateISO),
            appointmentPrice: appointmentPrice ? parseInt(appointmentPrice) : null,
            appointmentDuration:  parseInt(appointmentDuration!),
          },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
