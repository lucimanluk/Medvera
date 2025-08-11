import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const connectionRouter = createTRPCRouter({
  acceptConnection: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.connection.update({
        where: {
          id: input.id,
        },
        data: {
          accepted: true,
        },
      });
    }),
  declineConnection: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.connection.delete({
        where: {
          id: input.id,
        },
      });
    }),
  createConnection: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
        patientId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.connection.create({
        data: {
          doctorId: input.doctorId,
          patientId: input.patientId,
          accepted: false,
        },
      });
    }),
  /*
    cancelConnection: publicProcedure.input(z.object({
        doctorId: z.string(),
        patientId: z.string(),
    })).mutation(async ({ctx, input}) => {
        return await ctx.db.connection.delete({
            where: {
                doctorId: input.doctorId,
                patientId: input.patientId,
            },
        })
    }),*/
  getConnections: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user.id }
      : { patientId: user?.id };

    const data = await ctx.db.connection.findMany({
      where: whereClause,
      include: {
        patient: true,
        doctor: true,
      },
    });
    return { data, user };
  }),
});
