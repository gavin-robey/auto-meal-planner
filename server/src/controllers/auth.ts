import UserModel from "src/models/user";
import AuthVerificationToken from "src/models/authVerificationToken"; // Correct import
import crypto from "crypto";
import { sendVerification } from "src/utils/mail";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken"
import { RequestHandler } from "express";
import { JWT_CONFIG } from "src/config/jwt";

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

        const link = `http://localhost:8000/verify?id=${newUser._id}&token=${token}`;
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
            message: "Check your inbox!",
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

export const verifyEmail = async(id: string, token: string) => {
    try{
        const authToken = await AuthVerificationToken.findOne({ owner: id })
        if(!authToken){
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Authentication token does not exist"});
        }

        const isValid = await authToken.compareToken(token);
        if (!isValid) {
            throw new TRPCError({code: "UNAUTHORIZED",message: "Invalid verification token"});
        }

        await UserModel.findByIdAndUpdate(id, {verified: true})
        await AuthVerificationToken.findByIdAndDelete(authToken._id)

        return `Thanks for joining, you have been verified!`;
    } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to verify email",
            cause: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export const signIn = async(email: string, password: string) => {
    const user = await UserModel.findOne({ email });

    if (!user)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found"});

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid Password"});
    }

    if (!user.verified) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Please verify your email"});
    }

    const payload = {
        id: user._id,
        email: user.email
    }

    const accessToken = jwt.sign(payload, JWT_CONFIG.secret, {
        expiresIn: JWT_CONFIG.accessTokenExpiry
    });

    const refreshToken = jwt.sign(payload, JWT_CONFIG.secret, {
        expiresIn: JWT_CONFIG.refreshTokenExpiry
    });

    if(!user.tokens){
        user.tokens = [refreshToken]
    }else{
        // Keep only the last 5 refresh tokens for security
        user.tokens = [...user.tokens.slice(-4), refreshToken]
    }

    await user.save()

    return {
        profile: {
            id: user._id,
            email: user.email,
            name: user.name,
            verified: user.verified,
        },
        tokens: {
            refresh: refreshToken,
            access: accessToken,
        }
    }
}

export const sendProfile: RequestHandler = (req, res) => {
    res.json({ profile: req.user });
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found",
            });
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            verified: user.verified,
        };
    } catch (error) {
        console.error("Error fetching user by email:", error);
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