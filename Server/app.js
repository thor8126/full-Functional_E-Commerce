import express, { urlencoded } from "express";
import { config } from "dotenv";
import morgan from "morgan";

// configure .env file
config({
  path: "./.env",
});
// i am exporting app so that i can start server in server.js
export const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
