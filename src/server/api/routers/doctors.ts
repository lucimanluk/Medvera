import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const doctorsRouter = createTRPCRouter({
  get2: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.user.findMany({
      where: {
        doctor: true,
      },
    });
    return data;
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
