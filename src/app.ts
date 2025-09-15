import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import logger from "morgan";
import { config } from "./config";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import userRouter from "./routes/user.route";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(config.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/users", userRouter);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to User Backend Server. 👋");
});

app.listen(config.PORT, () => {
  console.log(`🚀Server running on port:: ${config.PORT}`);
});

export default app;