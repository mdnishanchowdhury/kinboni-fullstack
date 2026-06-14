import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cors from "cors";
import { envVars } from "./app/config/env";

const app: Application = express();

app.use(cors({
    origin: [envVars.FRONTEND_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", IndexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

app.use(globalErrorHandler);
app.use(notFound)

export default app;