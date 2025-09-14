import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import ISSMConnectDb from "./config/database";
import feedbackRouter from "./routes/feedbackRoute";
import metricsRouter from "./routes/metricsRoute";
import "./services/metricsService";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/feedback", feedbackRouter);
app.use("/api/metrics", metricsRouter);

app.all(/.*/, (req: Request, res: Response) => {
  res.status(404).json({
    success: "error",
    message: `Can't find ${req.originalUrl} at this server `,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});

ISSMConnectDb();
