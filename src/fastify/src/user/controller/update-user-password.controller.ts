import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserPasswordUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace UpdateUserPasswordController {
  export class Controller {
    public async handle(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> {
      const { id } = request.params as { id: string };
      const { oldPassword, password } =
        request.body as UpdateUserPasswordUseCase.Input;

      const output = await useCase.execute({ id, oldPassword, password });

      return reply.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<UpdateUserPasswordUseCase.UseCase>(
    USER_REGITRY.UpdateUserPasswordUseCase
  );
}

export default UpdateUserPasswordController;
