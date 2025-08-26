import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const appointmentRouter = createTRPCRouter({
getDashboardAppointments: protectedProcedure.query(async ({ ctx }) => {
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
    });

    return {data, user};
  }),
  getAppointments: protectedProcedure.query(async ({ ctx }) => {
      const user = ctx.session?.user;
  
      const whereClause = user?.doctor
        ? { doctorId: user?.id }
        : { patientId: user?.id };
  
      const data = await ctx.db.appointment.findMany({
        where: whereClause,
        include: {
          patient: {
            include: {
              patientProfile: true,
            }
          },
          doctor: {
            include: {
              doctorProfile: true,
            }
          },
        },
        orderBy: {appointmentDate: 'asc'}
      });
  
      return {data, user};
    }),
  createAppointment: protectedProcedure.input(z.object({
    id: z.string(),
    appointmentDate: z.date(),
    appointmentPrice: z.number(),
    appointmentDuration: z.number(),
})).mutation(async ({ctx, input}) => {
   const user = ctx.session?.user;
   
  if (user) {
   return await ctx.db.appointment.create({
    data: {
      patientId: user?.id,
      doctorId: input.id,
      appointmentDate: input.appointmentDate,
      appointmentPrice: input.appointmentPrice,
      appointmentDuration: input.appointmentDuration,
    },
   })}
})
});