import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),
  getAppointments: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;

    const whereClause = user?.doctor
      ? { doctorId: user?.id }
      : { patientId: user?.id };

    const data = await ctx.db.appointment.findMany({
      where: whereClause,
      include: {
        patient: true,
        doctor: true,
      },
    });

    return {data, user};
  }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
