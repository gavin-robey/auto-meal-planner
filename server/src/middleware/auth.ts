import type { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserModel, { User } from "../models/user";
import pkg from 'jsonwebtoken';
import { TRPCError } from "@trpc/server";
import { JWT_CONFIG } from "src/config/jwt";

const { TokenExpiredError, JsonWebTokenError } = pkg;

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export const isAuth = async (req: Request, res: Response) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new TRPCError({ 
                code: "UNAUTHORIZED", 
                message: "Missing authorization token" 
            });
        }

        const token = authToken.split("Bearer ")[1];
        if (!token) {
            throw new TRPCError({ 
                code: "UNAUTHORIZED", 
                message: "Invalid token format. Use 'Bearer <token>'" 
            });
        }

        const payload = jwt.verify(token, JWT_CONFIG.secret) as { id: string, email: string };
        const user = await UserModel.findById(payload.id);
        
        if (!user) {
            throw new TRPCError({ 
                code: "UNAUTHORIZED", 
                message: "User not found" 
            });
        }

        req.user = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            verified: user.verified,
            tokens: user.tokens,
            createdAt: user.createdAt,
        }

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new TRPCError({ 
                code: "UNAUTHORIZED", 
                message: "Session expired. Please sign in again." 
            });
        }
        if (error instanceof JsonWebTokenError) {
            throw new TRPCError({ 
                code: "UNAUTHORIZED", 
                message: "Invalid token. Please sign in again." 
            });
        }
        throw new TRPCError({ 
            code: "UNAUTHORIZED", 
            message: `Authentication failed: ${(error as Error).message}` 
        });
    }
}