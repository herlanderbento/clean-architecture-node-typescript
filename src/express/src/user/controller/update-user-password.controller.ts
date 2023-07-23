import { Request, Response } from "express";
import { UpdateUserPasswordUseCase } from "@m27/the-food/src/user/application";
import {
  USER_CONTAINER,
  USER_REGITRY,
} from "../../@seedwork/container/user-container-registry";

export namespace UpdateUserPasswordController {
  export class Controller {
    public async handle(
      request: Request,
      response: Response
    ): Promise<Response> {
      const { id } = request.params;
      const { oldPassword, password } = request.body;

      const output = await useCase.execute({ id, oldPassword, password });

      return response.status(200).send(output);
    }
  }

  export const useCase = USER_CONTAINER.get<UpdateUserPasswordUseCase.UseCase>(
    USER_REGITRY.UpdateUserPasswordUseCase
  );
}

export default UpdateUserPasswordController;
