import express from "express";
import type { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";

// testing
import { authMiddleware } from "./middlewares/auth.middleware";
import type { AuthRequest } from "./middlewares/auth.middleware";

const app: Application = express();

// automatically adds secutiry HTTP headers
app.use(helmet());

// logs every HTTP request and its response in the console
app.use(morgan("dev"));

// enable adding JSON in the body request
// we limit the size to 5 mb, to prevent DOS attacks
app.use(express.json({ limit: "5mb" }));

// authentication routes
app.use("/api/auth", authRoutes);

// just for testing
app.get("/protected", authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

// route to check the health of the server
app.get("/api/health", (_, res: Response) => {
    res.status(200).json({ status: "OK" });
});

// route if the user gives an unknwon route in the URL
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;