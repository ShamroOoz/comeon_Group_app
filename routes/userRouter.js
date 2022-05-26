import { Router } from "express";
import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";

const router = Router();

// Login User
router.post("/login", userCtrl.loginUser);

// Register User
router.post("/logout", userCtrl.logoutUser);

// verify Token
router.get("/verify", userCtrl.verifiedToken);

export default router;
