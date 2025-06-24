import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    createPatientProfile: publicProcedure.input(z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }))
    .mutation(async ({ctx, input}) => {

        return await ctx.db.patientProfile.create({
            data: {
                userEmail: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
            }
        })
    }),
    createDoctorProfile: publicProcedure.input(z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }))
    .mutation(async ({ctx, input}) => {
        return await ctx.db.doctorProfile.create({
            data: {
                userEmail: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
            }
        })
    }),
});
