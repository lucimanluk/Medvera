import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const doctorsRouter = createTRPCRouter({
  getDoctors: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    const data = await ctx.db.user.findMany({
      where: {
        doctor: true,
      },
      include: {
        doctorConnections: {
          include: {
            doctor: true,
            patient: true,
          }
        },
        doctorProfile: true,
      }
    });
    return {data, user};
  }),
  getPage: publicProcedure.input(z.object({doctor: z.string()})).query(async ({ctx, input}) =>{
    const clause = input.doctor;
    
    const data = await ctx.db.user.findUnique({
      where: {
        id: clause,
      },
      include: {
        doctorAppointments: true,
      }
    })
     return data;
  })
});
