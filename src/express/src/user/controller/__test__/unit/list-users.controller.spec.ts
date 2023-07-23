import { Request, Response } from "express";
import { ListUsersController } from "../../list-users.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("ListUsersController unit test", () => {
  let response: Response;
  let createUserController: CreateUserController.Controller;
  let listUsersController = new ListUsersController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    listUsersController = new ListUsersController.Controller();

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

  it("should list users and return 200 status", async () => {
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
      query: {},
    } as unknown as Request;

    await listUsersController.handle(request, response);
    expect(response.statusCode).toBe(200);
    //@ts-expect-error
    expect(response.data).toEqual({
      current_page: 1,
      items: [
        {
          id: data.id,
          name: "user",
          email: "user@example.com",
          created_at: data.created_at,
          updated_at: data.updated_at,
        },
      ],
      last_page: 1,
      per_page: 15,
      total: 1,
    });
  });
});
