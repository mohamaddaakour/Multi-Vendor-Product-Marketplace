import { UserRepository } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/hash.util";
import type { User, UserRole } from "../types/user.types";
import { generateToken } from "../utils/jwt.util";

const userRepository = new UserRepository();

export class UserService {

    // create new user
    // here we didn't create a token because after registration, the new user
    // have to login and after login the token will be created
    async register(email: string, password: string, role: UserRole): Promise<User> {

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await userRepository.createUser(
            email,
            hashedPassword,
            role
        );

        return user;
    }

    // login and create a token for this user
    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await comparePassword(password, user.password);

        // we create a token for this user
        const token = generateToken(user.id, user.role);

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        }
    }
}