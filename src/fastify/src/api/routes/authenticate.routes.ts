import { FastifyInstance } from "fastify";
import AuthenticateUserController from "../../user/controller/authenticate-user.controller";

const authenticateUserController = new AuthenticateUserController.Controller();

export async function authenticateRoutes(app: FastifyInstance) {
  app.post("/authentication", authenticateUserController.handle);
}
