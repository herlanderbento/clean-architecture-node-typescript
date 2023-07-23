import { Request, Response } from "express";
import { CreateUserUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace CreateUserController {
  export class Controller {
    public async handle(
      request: Request,
      response: Response
    ): Promise<Response> {
      const { name, email, password } = request.body;

      const output = await useCase.execute({ name, email, password });

      return response.status(201).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<CreateUserUseCase.UseCase>(
    USER_REGITRY.CreateUserUseCase
  );
}

export default CreateUserController;
