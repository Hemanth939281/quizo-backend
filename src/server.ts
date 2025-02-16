import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import quizRoutes from "./routes/quizRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
