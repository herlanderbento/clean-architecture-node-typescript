import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/user", userRoutes);
router.use(authenticateRoutes);

export default router;
