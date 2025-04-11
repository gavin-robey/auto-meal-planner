import { createNewUser, signIn, verifyEmail, getUserByEmail } from "src/controllers/auth";
import { privateProcedure, publicProcedure, trpc } from "src/lib/trpc";
import { newUserSchema, verifyUserSchema, signInSchema, emailSchema } from "src/validators/auth";

export const authRouter = trpc.router({
    signUp: publicProcedure
        .input(newUserSchema)
        .mutation(async ({ input }) => {
            return createNewUser(input.email, input.password, input.name);
        }),
    verify: publicProcedure
        .input(verifyUserSchema)
        .mutation(async ({ input }) => {
            return verifyEmail(input.id, input.token);
        }),
    signIn: publicProcedure
        .input(signInSchema)
        .mutation(async ({ input }) => {
            return signIn(input.email, input.password);
        }),
    profile: privateProcedure
        .input(emailSchema)
        .mutation(async ({ input }) => {
            return getUserByEmail(input.email);
        }),
});