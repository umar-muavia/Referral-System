import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { authController } from "./auth.controller.js";
import { loginRequest, registerRequest } from "./auth.req.js";

const router = Router();

router.post("/register", registerRequest, validateRequest, asyncHandler(authController.register));
router.post("/login", loginRequest, validateRequest, asyncHandler(authController.login));

export default router;
