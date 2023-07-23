import { Request, Response } from "express";
import { UpdateUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace UpdateUserController {
  export class Controller {
    public async handle(
      request: Request,
      response: Response
    ): Promise<Response> {
      const { id } = request.params;
      const { name, email } = request.body;

      const output = await useCase.execute({ id, name, email });

      return response.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<UpdateUserUseCase.UseCase>(
    USER_REGITRY.UpdateUserUseCase
  );
}

export default UpdateUserController;
