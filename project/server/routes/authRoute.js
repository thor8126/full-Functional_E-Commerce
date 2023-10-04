import express from "express";
import {
  loginControler,
  registerControler,
  testController,
} from "../controllers/authControler.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object
const router = express.Router();

// routing

// Register
router.post("/register", registerControler);

// Login
router.post("/login", loginControler);

// test routes
router.get("/test", requireSignIn, isAdmin ,testController)

export default router;
