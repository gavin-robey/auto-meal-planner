import { trpc } from 'src/lib/trpc';
import { authRouter } from './auth';

export const appRouter = trpc.router({
    auth : authRouter
});

export type AppRouter = typeof appRouter;