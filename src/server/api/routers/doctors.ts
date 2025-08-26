import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const doctorsRouter = createTRPCRouter({
  getDoctors: protectedProcedure.query(async ({ ctx }) => {
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
          },
        },
        doctorProfile: true,
      },
    });
    return { data, user };
  }),
  getPage: protectedProcedure
    .input(z.object({ doctor: z.string() }))
    .query(async ({ ctx, input }) => {
      const clause = input.doctor;

      const data = await ctx.db.user.findUnique({
        where: {
          id: clause,
        },
        include: {
          doctorAppointments: true,
          doctorProfile: true,
        },
      });
      return data;
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (userId)
      return await ctx.db.user.findUnique({
        where: { id: ctx.session?.user.id },
        include: {
          doctorProfile: true,
        },
      });
  }),
});
