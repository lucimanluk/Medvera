import {z} from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prescriptionRouter = createTRPCRouter({
    getDashboardPrescriptions: publicProcedure.query(async ({ctx}) => {
        const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user?.id }
      : { patientId: user?.id };


    const data = await ctx.db.appointment.findMany({
      take: 5,
      where: whereClause,
      include: {
        patient: true,
        doctor: true,
      },
      orderBy: {
        appointmentDate: 'asc',
      }
    });

    return data;
  }),
})