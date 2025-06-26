import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { appointmentRouter } from "./routers/appointment";
import { prescriptionRouter } from "./routers/prescription";
import { doctorsRouter } from "./routers/doctors";
import { profileRouter } from "./routers/profile";
import { connectionRouter } from "./routers/connection";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  appointment: appointmentRouter,
  prescription: prescriptionRouter,
  doctor: doctorsRouter,
  profile: profileRouter,
  connection:connectionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
