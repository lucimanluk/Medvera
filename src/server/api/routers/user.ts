import {  z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: { email: input.email },
      });
    }),
  get2: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { email: ctx.session?.user.email },
    });
  }),
  get3: publicProcedure.query(async ({ctx}) => {

    const id = ctx.session?.user.id;

    return await ctx.db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        doctorProfile: true,
        patientProfile: true,
      }
    }) 
  }),
  setDoctor: publicProcedure.input(z.object({
    email: z.string(),
    doctor: z.boolean(),
  })).mutation(async ({ctx, input}) => {
    return await ctx.db.user.update({
      where: {
         email: input.email,
      },
      data: {
        doctor: input.doctor,
      }
    })
  })
});
