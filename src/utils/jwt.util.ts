import jwt, { SignOptions } from "jsonwebtoken";
import type { UserRole } from "../types/user.types";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

if (!process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_EXPIRES_IN is not defined");
}

const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

export function generateToken(userId: number, role: UserRole): string {
    return jwt.sign(
        { userId, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}