import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const checkoutRouter = createTRPCRouter({
  createSession: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
        doctorProfileId: z.string(),
        appointmentDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const doctor = await ctx.db.doctorProfile.findUnique({
        where: { id: input.doctorProfileId },
        select: { appointmentPrice: true, appointmentDuration: true, firstName: true, lastName: true },
      });

      if (!doctor?.appointmentPrice) {
        throw new Error("Doctor not found or missing price");
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "ron",
              product_data: {
                name: "Doctor Appointment",
                description: `Consultation on ${new Date(input.appointmentDate).toLocaleString()} with ${doctor.firstName} ${doctor.lastName}`,
              },
              unit_amount: doctor.appointmentPrice * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/appointments`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/finddoctor/${input.doctorId}`,
        metadata: {
          doctorId: input.doctorId,
          patientId: ctx.session?.user.id ?? "anonymous",
          appointmentDateISO: input.appointmentDate,
          appointmentPrice: doctor.appointmentPrice,
          appointmentDuration: doctor.appointmentDuration,
        },
      });
      return { url: session.url };
    }),
});
