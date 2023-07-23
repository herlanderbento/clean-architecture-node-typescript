import { Request, Response } from "express";
import { UpdateUserController } from "../../update-user.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("UpdateUserController unit test", () => {
  let response: Response;
  let createUserController: CreateUserController.Controller;
  let updateUserController = new UpdateUserController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    updateUserController = new UpdateUserController.Controller();

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

  it("should update a user and return 200 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as Request;

    //@ts-expect-error
    const { data } = await createUserController.handle(request, response);
    expect(response.statusCode).toBe(201);

    request = {
      params: {
        id: data.id,
      },
      body: {
        name: "eugenia gaieta",
        email: "eugenia@example.com",
        password: "eugeniapassword",
      },
    } as unknown as Request;

    //@ts-expect-error
    const { data: output } = await updateUserController.handle(
      request,
      response
    );
    expect(response.statusCode).toBe(200);
    //@ts-expect-error
    expect(response.data).toEqual({
      id: output.id,
      name: "eugenia gaieta",
      email: "eugenia@example.com",
      created_at: output.created_at,
      updated_at: output.updated_at,
    });
  });
});
