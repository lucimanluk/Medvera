import { boolean, z } from "zod";

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

    const doctorCheck = ctx.session?.user.doctor;

    if(doctorCheck) {
    return await ctx.db.user.findUnique({
      where: {id: ctx.session?.user.id},
      include: {
        doctorProfile: true,
      }
    })
  } else {
    return await ctx.db.user.findUnique({
      where: {id: ctx.session?.user.id},
      include: {
        patientProfile: true,
      }
    })
  }
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
