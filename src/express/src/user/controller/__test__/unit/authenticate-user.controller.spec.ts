import { Request, Response } from "express";
import { AuthenticateUserController } from "../../authenticate-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";
import CreateUserController from "../../create-user.controller";

describe("AuthenticateUserController unit tests", () => {
  let response: Response;
  let createUsercontroller: CreateUserController.Controller;
  let authenticateUserController: AuthenticateUserController.Controller;

  beforeEach(async () => {
    createUsercontroller = new CreateUserController.Controller();
    authenticateUserController = new AuthenticateUserController.Controller();

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

  it("should authenticate a user and return 201 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as Request;

    await createUsercontroller.handle(request, response);

    request = {
      body: {
        email: "user@example.com",
        password: "test123",
      },
    } as Request;

    const output = await authenticateUserController.handle(request, response);
    expect(response.statusCode).toBe(200);
    //@ts-expect-error
    expect(response.data).toStrictEqual({
    //@ts-expect-error
      token: output.data.token,
      user: {
        name: "user",
        email: "user@example.com",
      },
    });
  });
});
