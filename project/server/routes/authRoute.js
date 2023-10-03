import express from "express";
import { registerControler } from "../controllers/authControler.js";
// router object
const router = express.Router();

// routing

// Register
router.post("/register", registerControler);

export default router;
