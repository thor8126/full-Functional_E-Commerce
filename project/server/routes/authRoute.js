import express from "express";
import {
  forgotPasswordControler,
  loginControler,
  registerControler,
  testController,
  updateProfileController,
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

// Potected user auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//  Potected admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
//  Potected admin auth
router.put("/profile", requireSignIn, updateProfileController);

// forgot password
router.post("/forgot-password", forgotPasswordControler);
export default router;
