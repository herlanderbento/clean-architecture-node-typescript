import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace UpdateUserController {
  export class Controller {
    public async handle(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> {
      const { id } = request.params as { id: string };
      const { name, email } = request.body as UpdateUserUseCase.Input;

      const output = await useCase.execute({ id, name, email });

      return reply.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<UpdateUserUseCase.UseCase>(
    USER_REGITRY.UpdateUserUseCase
  );
}

export default UpdateUserController;
