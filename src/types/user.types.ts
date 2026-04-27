export type UserRole = "admin" | "vendor" | "customer";

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
};