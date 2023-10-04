import express from "express";
import {
  loginControler,
  registerControler,
} from "../controllers/authControler.js";
// router object
const router = express.Router();

// routing

// Register
router.post("/register", registerControler);

// Login
router.post("/login", loginControler);

export default router;
