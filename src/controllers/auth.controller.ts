import { Request, Response } from "express";
import { UserService } from "../services/auth.service";

const userService = new UserService();

export class UserController {

    async register(req: Request, res: Response) {
        try {
            // req.body takes the request body
            const { email, password, role } = req.body;

            const user = await userService.register(email, password, role);

            res.status(201).json({
                message: "User created successfully",
                user
            });

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await userService.login(email, password);

            res.status(200).json(result);

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}