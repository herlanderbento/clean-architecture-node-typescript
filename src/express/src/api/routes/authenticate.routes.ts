import { Router } from "express";
import AuthenticateUserController from "../../user/controller/authenticate-user.controller";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController.Controller();

authenticateRoutes.post("/authentication", authenticateUserController.handle);

export { authenticateRoutes };
