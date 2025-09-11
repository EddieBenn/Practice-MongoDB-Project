import express from "express";
import { connectDB } from "./config/database";
import logger from "morgan";
import { config } from "./config";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";

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
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀Server running on port:: ${config.PORT}`);
});

export default app;