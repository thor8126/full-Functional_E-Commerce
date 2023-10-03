import express from "express";
import { config } from "dotenv";

// i am exporting app so that i can start server in server.js
export const app = express();
// here i am giving the path so that config can use .env file
config({
  path: "./.env",
});
