import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
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

  cancelConnection: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
        patientId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.connection.delete({
          where: {
            patientId_doctorId: {
              patientId: input.patientId,
              doctorId: input.doctorId,
            },
          },
        });
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2025"
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Connection was already canceled.",
          });
        }
        throw e;
      }
    }),
  getConnections: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user.id }
      : { patientId: user?.id };

    const data = await ctx.db.connection.findMany({
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
  getPrescriptionConnections: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const baseClause1 = user?.doctor
      ? { doctorId: user.id }
      : { patientId: user?.id };

    const whereClause = {
      ...baseClause1,
      accepted: true,
    };

    const data = await ctx.db.connection.findMany({
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
});
