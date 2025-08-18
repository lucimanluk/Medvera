import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prescriptionRouter = createTRPCRouter({
  getDashboardPrescriptions: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user?.id }
      : { patientId: user?.id };

    const data = await ctx.db.prescription.findMany({
      take: 5,
      where: whereClause,
      include: {
        patient: true,
        doctor: true,
      },
    });

    return { data, user };
  }),
  getPrescriptions: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user?.id }
      : { patientId: user?.id };

    const data = await ctx.db.prescription.findMany({
      where: whereClause,
      include: {
        patient: {
          include: {
            patientProfile: true,
          },
        },
        doctor: {
          include: {
            doctorProfile: true,
          },
        },
      },
    });
    return { data, user };
  }),
  createPrescription: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        startingDate: z.date(),
        endingDate: z.date(),
        dosage: z.string(),
        frequency: z.string(),
        diagnostic: z.string(),
        instructions: z.string(),
        medicationName: z.string(),
        quantity: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session?.user;

      if (user)
        return await ctx.db.prescription.create({
          data: {
            patientId: input.patientId,
            startingDate: input.startingDate,
            endingDate: input.endingDate,
            doctorId: user?.id,
            dosage: input.dosage,
            diagnostic: input.diagnostic,
            frequency: input.frequency,
            instructions: input.instructions,
            medicationName: input.medicationName,
            quantity: input.quantity,
          },
        });
    }),
  getDownloadPrescription: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {

      return await ctx.db.prescription.findUnique({
        where: { id: input.id },
      });
    }),
});
