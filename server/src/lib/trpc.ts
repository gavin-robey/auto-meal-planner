import { initTRPC } from '@trpc/server';

// add authentication stuff here 
export const trpc = initTRPC.create();

// add private and admin privaleges
export const publicProcedure = trpc.procedure
export const privateProcedure = trpc.procedure
export const adminProcedure = trpc.procedure