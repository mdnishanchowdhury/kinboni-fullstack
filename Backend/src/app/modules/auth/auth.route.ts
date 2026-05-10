import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Role } from "../../../generated/prisma/browser";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get("/me", checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER), AuthController.getMe);
router.post("/register", AuthController.registerUser)
router.post("/login", AuthController.loginUser)
router.post("/logout", checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER), AuthController.logoutUser)

export const AuthRoutes = router;