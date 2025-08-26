import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const prescriptionRouter = createTRPCRouter({
  getDashboardPrescriptions: protectedProcedure.query(async ({ ctx }) => {
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
  getPrescriptions: protectedProcedure.query(async ({ ctx }) => {
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
  createPrescription: protectedProcedure
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
        patientName: z.string(),
        doctorName: z.string(),
        cabinetName: z.string(),
        cabinetPhone: z.string(),
        cabinetAddress: z.string(),
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
            patientName: input.patientName,
            doctorName: input.doctorName,
            cabinetName: input.cabinetName,
            cabinetPhone: input.cabinetPhone,
            cabinetAddress: input.cabinetAddress,
          },
        });
    }),

});
