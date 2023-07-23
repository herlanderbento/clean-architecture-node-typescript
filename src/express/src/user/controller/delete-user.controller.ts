import { Request, Response } from "express";
import { DeleteUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace DeleteUserController {
  export class Controller {
    public async handle(
      request: Request,
      response: Response
    ): Promise<Response> {
      const { id } = request.params;

      const output = await useCase.execute({ id });

      return response.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<DeleteUserUseCase.UseCase>(
    USER_REGITRY.DeleteUserUseCase
  );
}

export default DeleteUserController;
