import { Request, Response } from "express";
import { GetUserController } from "../../get-user.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("GetUserController unit test", () => {
  let response: Response;
  let createUserController: CreateUserController.Controller;
  let getUserController = new GetUserController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    getUserController = new GetUserController.Controller();

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

  it("should get a user and return 200 status", async () => {
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

    await getUserController.handle(request, response);
    expect(response.statusCode).toBe(200);
    //@ts-expect-error
    expect(response.data).toEqual({
      id: data.id,
      name: "user",
      email: "user@example.com",
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  });
});
