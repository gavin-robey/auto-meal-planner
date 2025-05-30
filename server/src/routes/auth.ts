import { createNewUser, signIn, verifyEmail, getUserByEmail, generateNewAuthToken, refreshToken, signOut } from "src/controllers/auth";
import { privateProcedure, publicProcedure, trpc } from "src/lib/trpc";
import { newUserSchema, verifyUserSchema, signInSchema, emailSchema, refreshTokenSchema } from "src/validators/auth";

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
    generateToken: privateProcedure
        .query(async ({ ctx }) => {
            return generateNewAuthToken(ctx.req.user.id);
        }),
    refreshToken: publicProcedure
        .input(refreshTokenSchema)
        .mutation(async ({ input }) => {
            return refreshToken(input.refreshToken);
        }),
    signOut: privateProcedure
        .input(refreshTokenSchema)
        .mutation(async ({ ctx, input }) => {
            return signOut(ctx.req.user.id, input.refreshToken);
        }),
});