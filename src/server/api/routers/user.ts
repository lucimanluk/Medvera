import { z } from "zod";

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
});
