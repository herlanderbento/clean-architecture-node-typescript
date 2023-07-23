import { Request, Response } from "express";
import { DeleteUserController } from "../delete-user.controller";
import { CreateUserController } from "../create-user.controller";
import { sequelizeSetupDB } from "../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("DeleteUserController unit test", () => {
  let response: Response;
  let createUserController: CreateUserController.Controller;
  let deleteUserController = new DeleteUserController.Controller;

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    deleteUserController = new DeleteUserController.Controller();

    response = {
      status: function (statusCode: number) {
        //@ts-expect-error
        this.statusCode = statusCode;
        return this;
      },
      send: function (data: any) {
        //@ts-expect-error
        this.data = data;
        return this;
      },
    } as unknown as Response;

    await sequelizeSetupDB();
  });

  it("should delete a user and return 200 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as Request;

    //@ts-expect-error
    const { data } = await createUserController.handle(request, response);

    request = {
      params: {
        id: data.id,
      },
    } as unknown as Request;

    await deleteUserController.handle(request, response);
    expect(response.statusCode).toBe(200);
  });
});
