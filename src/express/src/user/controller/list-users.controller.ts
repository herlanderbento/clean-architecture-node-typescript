import { Request, Response } from "express";
import { ListUsersUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace ListUsersController {
  export class Controller {
    public async handle(
      request: Request,
      response: Response
    ): Promise<Response> {
      const output = await useCase.execute(request.query);

      return response.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<ListUsersUseCase.UseCase>(
    USER_REGITRY.ListUsersUseCase
  );
}

export default ListUsersController;
