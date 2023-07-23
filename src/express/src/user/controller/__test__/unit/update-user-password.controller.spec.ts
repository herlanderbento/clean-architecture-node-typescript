import { Request, Response } from "express";
import { UpdateUserPasswordController } from "../../update-user-password.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("UpdateUserPasswordController unit test", () => {
  let response: Response;
  let createUserController: CreateUserController.Controller;
  let updateUserPasswordController =
    new UpdateUserPasswordController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    updateUserPasswordController =
      new UpdateUserPasswordController.Controller();

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
        name: "eugenia gaieta",
        email: "eugenia@example.com",
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
        oldPassword: "test123",
        password: "eugeniapassword",
      },
    } as unknown as Request;

    //@ts-expect-error
    const { data: output } = await updateUserPasswordController.handle(
      request,
      response
    );
    expect(response.statusCode).toBe(200);
    //@ts-expect-error
    expect(response.data).toEqual({
      id: output.id,
      name: "eugenia gaieta",
      email: "eugenia@example.com",
      password: output.password,
      created_at: output.created_at,
      updated_at: output.updated_at,
    });
  });
});
