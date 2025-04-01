import { createNewUser, verifyEmail } from "src/controllers/auth";
import { privateProcedure, publicProcedure, trpc } from "src/lib/trpc";
import { newUserSchema, verifyUserSchema } from "src/validators/auth";

export const authRouter = trpc.router({
    signUp : publicProcedure
        .input(newUserSchema)
        .mutation(async ({ input }) => {
            return createNewUser(input.email, input.password, input.name)
        }),
    verify : privateProcedure
        .input(verifyUserSchema)
        .mutation(async ({ input }) => {
            return verifyEmail(input.id, input.token)
        }),
})