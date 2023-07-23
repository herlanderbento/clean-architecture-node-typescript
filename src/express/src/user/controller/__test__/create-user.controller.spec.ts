import { Request, Response } from "express";
import { CreateUserController } from "../create-user.controller";
import { sequelizeSetupDB } from "../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("CreateUserController unit tests", () => {
  let response: Response;
  let controller: CreateUserController.Controller;

  beforeEach(async () => {
    controller = new CreateUserController.Controller();
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

  it("should create a user", async () => {
    const request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as Request;

    //@ts-expect-error
    const { data } = await controller.handle(request, response);
    expect(response.statusCode).toBe(201);
    //@ts-expect-error
    expect(response.data).toEqual({
      id: data.id,
      name: "user",
      email: "user@example.com",
      created_at: data.created_at,
      updated_at: data.created_at,
    });
  });
});
