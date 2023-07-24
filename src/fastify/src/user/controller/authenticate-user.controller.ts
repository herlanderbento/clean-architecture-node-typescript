import { FastifyRequest, FastifyReply } from "fastify";
import { AutenticateUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace AuthenticateUserController {
  export class Controller {
    public async handle(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> {
      const { email, password } = request.body as AutenticateUserUseCase.Input;

      const output = await useCase.execute({ email, password });

      return reply.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<AutenticateUserUseCase.UseCase>(
    USER_REGITRY.AutenticateUserUseCase
  );
}

export default AuthenticateUserController;
