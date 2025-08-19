import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  createPatientProfile: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.patientProfile.create({
        data: {
          userEmail: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          image: input.image,
        },
      });
    }),
  updatePatientProfile: publicProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        image: z.string().optional(),
        phoneNumber: z.string().nullable().optional(),
        series: z.string().nullable().optional(),
        cnp: z.string().nullable().optional(),
        birthDate: z.coerce.date().nullable().optional(),
        gender: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        county: z.string().nullable().optional(),
        zipCode: z.string().nullable().optional(),

        emergencyFirst: z.string().nullable().optional(),
        emergencyLast: z.string().nullable().optional(),
        emergencyRelation: z.string().nullable().optional(),
        emergencyPhone: z.string().nullable().optional(),

        familyDoctor: z.string().nullable().optional(),
        familyDoctorPhone: z.string().nullable().optional(),

        bloodType: z.string().nullable().optional(),
        rhFactor: z.string().nullable().optional(),
        weight: z.number().nullable().optional(),
        height: z.number().nullable().optional(),
        allergies: z.array(z.string()).optional(),
        medicalConditions: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.session?.user.email;

      if (ctx.session?.user.doctor == false) {
        return await ctx.db.patientProfile.update({
          where: { userEmail: userEmail },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            image: input.image,
            phoneNumber: input.phoneNumber,
            series: input.series,
            cnp: input.cnp,
            birthDate: input.birthDate,
            gender: input.gender,
            address: input.address,
            city: input.city,
            county: input.county,
            zipCode: input.zipCode,

            emergencyFirst: input.emergencyFirst,
            emergencyLast: input.emergencyLast,
            emergencyRelation: input.emergencyRelation,
            emergencyPhone: input.emergencyPhone,

            familyDoctor: input.familyDoctor,
            familyDoctorPhone: input.familyDoctorPhone,

            bloodType: input.bloodType,
            rhFactor: input.rhFactor,
            weight: input.weight,
            height: input.height,
            allergies: input.allergies,
            medicalConditions: input.medicalConditions,
          },
        });
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
  createDoctorProfile: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctorProfile.create({
        data: {
          userEmail: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          image: input.image,
        },
      });
    }),
  updateDoctorProfile: publicProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        image: z.string().optional(),
        phoneNumber: z.string().nullable().optional(),
        series: z.string().nullable().optional(),
        cnp: z.string().nullable().optional(),
        birthDate: z.coerce.date().nullable().optional(),
        gender: z.string().nullable().optional(),

        specialization: z.string().nullable().optional(),
        specializationIssueDate: z.coerce.date().nullable().optional(),

        cabinetName: z.string().nullable().optional(),
        cabinetPhone: z.string().nullable().optional(),
        cabinetAddress: z.string().nullable().optional(),
        cabinetCity: z.string().nullable().optional(),
        cabinetCounty: z.string().nullable().optional(),
        cabinetZipCode: z.string().nullable().optional(),

        cmrSeries: z.string().nullable().optional(),
        cmrNumber: z.string().nullable().optional(),
        cmrIssueDate: z.coerce.date().nullable().optional(),
        cmrExpirationDate: z.coerce.date().nullable().optional(),

        digiSigSeries: z.string().nullable().optional(),
        digiSigNumber: z.string().nullable().optional(),
        digiSigIssueDate: z.coerce.date().nullable().optional(),
        digiSigExpirationDate: z.coerce.date().nullable().optional(),

        appointmentDuration: z.number().int().nullable().optional(),
        appointmentPrice: z.number().int().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.session?.user.email;

      if (ctx.session?.user.doctor === true) {
        return await ctx.db.doctorProfile.update({
          where: { userEmail: userEmail },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            image: input.image,
            phoneNumber: input.phoneNumber,
            series: input.series,
            cnp: input.cnp,
            birthDate: input.birthDate,
            gender: input.gender,

            specialization: input.specialization,
            specializationIssueDate: input.specializationIssueDate,

            cabinetName: input.cabinetName,
            cabinetPhone: input.cabinetPhone,
            cabinetAddress: input.cabinetAddress,
            cabinetCity: input.cabinetCity,
            cabinetCounty: input.cabinetCounty,
            cabinetZipCode: input.cabinetZipCode,

            cmrSeries: input.cmrSeries,
            cmrNumber: input.cmrNumber,
            cmrIssueDate: input.cmrIssueDate,
            cmrExpirationDate: input.cmrExpirationDate,

            digiSigSeries: input.digiSigSeries,
            digiSigNumber: input.digiSigNumber,
            digiSigIssueDate: input.digiSigIssueDate,
            digiSigExpirationDate: input.digiSigExpirationDate,

            appointmentDuration: input.appointmentDuration,
            appointmentPrice: input.appointmentPrice,
          },
        });
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
