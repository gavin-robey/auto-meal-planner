import { createNewUser } from "src/controllers/auth";
import { publicProcedure, trpc } from "src/lib/trpc";
import { newUserSchema } from "src/validators/auth";

export const authRouter = trpc.router({
    signUp : publicProcedure
        .input(newUserSchema)
        .mutation(async ({ input }) => {
            return createNewUser(input.email, input.password, input.name)
        }),
})