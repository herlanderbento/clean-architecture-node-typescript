import { Router } from "express";
import CreateUserController from "../../user/controller/create-user.controller";

const userRoutes = Router();

const createUserController = new CreateUserController.Controller();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
