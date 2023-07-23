import { Router } from "express";
import CreateUserController from "../../user/controller/create-user.controller";
import DeleteUserController from "../../user/controller/delete-user.controller";

const userRoutes = Router();

const createUserController = new CreateUserController.Controller();
const deleteUserController = new DeleteUserController.Controller();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/:id", deleteUserController.handle);


export { userRoutes };
