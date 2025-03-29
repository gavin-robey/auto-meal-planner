import UserModel from "src/models/user";
import AuthVerificationToken from "src/models/authVerificationToken"; // Correct import
import crypto from "crypto";
import { sendVerification } from "src/utils/mail";
import { TRPCError } from "@trpc/server";

export const createNewUser = async (email: string, password: string, name: string) => {
    try {
        email = email.trim().toLowerCase();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "User already exists",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const newUser = await UserModel.create({
            email: email,
            password: password,
            name: name,
        });

        await AuthVerificationToken.create({
            token,
            owner: newUser._id,
        });

        const link = `http://localhost:8000/verify/?id=${newUser._id}&token=${token}`;
        try {
            await sendVerification(email, link);
        } catch (error) {
            console.error("Failed to send verification email:", error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to send verification email",
                cause: error instanceof Error ? error.message : "Unknown error",
            });
        }

        return {
            message: "Check your inbox",
        };
    } catch (error) {
        console.error("Error creating new user:", error);
        if (error instanceof TRPCError) {
            throw error;
        }
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred",
            cause: error instanceof Error ? error.message : "Unknown error",
        });
    }
};