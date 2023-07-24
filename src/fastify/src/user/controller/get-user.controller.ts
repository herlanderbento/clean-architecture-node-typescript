import { FastifyRequest, FastifyReply } from "fastify";
import { GetUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace GetUserController {
  export class Controller {
    public async handle(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> {
      const { id } = request.params as GetUserUseCase.Input;

      const output = await useCase.execute({ id });

      return reply.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<GetUserUseCase.UseCase>(
    USER_REGITRY.GetUserUseCase
  );
}

export default GetUserController;
