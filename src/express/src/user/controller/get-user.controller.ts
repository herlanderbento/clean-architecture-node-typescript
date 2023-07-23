import { Request, Response } from "express";
import { GetUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace GetUserController {
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

  export const useCase = USER_CONTAINER.get<GetUserUseCase.UseCase>(
    USER_REGITRY.GetUserUseCase
  );
}

export default GetUserController;
