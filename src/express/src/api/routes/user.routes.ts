import { Router } from "express";
import CreateUserController from "../../user/controller/create-user.controller";
import DeleteUserController from "../../user/controller/delete-user.controller";
import GetUserController from "../../user/controller/get-user.controller";
import ListUsersController from "../../user/controller/list-users.controller";
import UpdateUserController from "../../user/controller/update-user.controller";
import UpdateUserPasswordController from "../../user/controller/update-user-password.controller";

const userRoutes = Router();

const createUserController = new CreateUserController.Controller();
const deleteUserController = new DeleteUserController.Controller();
const getUserController = new GetUserController.Controller();
const listUsersController = new ListUsersController.Controller();
const updateUserController = new UpdateUserController.Controller();
const updateUserPasswordController =
  new UpdateUserPasswordController.Controller();

userRoutes.get("/", listUsersController.handle);
userRoutes.get("/:id", getUserController.handle);
userRoutes.post("/", createUserController.handle);
userRoutes.put("/:id", updateUserController.handle);
userRoutes.put("/password/:id", updateUserPasswordController.handle);
userRoutes.delete("/:id", deleteUserController.handle);

export { userRoutes };
