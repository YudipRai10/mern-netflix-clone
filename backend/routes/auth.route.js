import express from "express";

import {
  login,
  logout,
  signup,
  authCheck,
} from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
router.get("/authCheck", ProtectRoute, authCheck);

export default router;
