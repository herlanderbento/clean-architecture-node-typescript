import { FastifyInstance } from "fastify";
import CreateUserController from "../../user/controller/create-user.controller";
import DeleteUserController from "../../user/controller/delete-user.controller";
import GetUserController from "../../user/controller/get-user.controller";
import ListUsersController from "../../user/controller/list-users.controller";
import UpdateUserController from "../../user/controller/update-user.controller";
import UpdateUserPasswordController from "../../user/controller/update-user-password.controller";

const createUserController = new CreateUserController.Controller();
const deleteUserController = new DeleteUserController.Controller();
const getUserController = new GetUserController.Controller();
const listUsersController = new ListUsersController.Controller();
const updateUserController = new UpdateUserController.Controller();
const updateUserPasswordController =
  new UpdateUserPasswordController.Controller();

export async function userRoutes(app: FastifyInstance) {
  app.get("/", listUsersController.handle);
  app.get("/:id", getUserController.handle);
  app.post("/", createUserController.handle);
  app.put("/:id", updateUserController.handle);
  app.put("/password/:id", updateUserPasswordController.handle);
  app.delete("/:id", deleteUserController.handle);
}
