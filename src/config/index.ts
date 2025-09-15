import dotenv from "dotenv";

dotenv.config();

export const config = {
  DEFAULT_PER_PAGE: 10,
  DEFAULT_PAGE_NO: 1,
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
};
