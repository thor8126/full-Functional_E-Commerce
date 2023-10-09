import express from "express";
import {
  forgotPasswordControler,
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
router.get("/test", requireSignIn, isAdmin, testController);

// Potected auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// forgot password 
router.post('/forgot-password', forgotPasswordControler);
export default router;
