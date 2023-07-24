import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersController } from "../../list-users.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("ListUsersController unit test", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;
  let listUsersController = new ListUsersController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    listUsersController = new ListUsersController.Controller();

    resply = {
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
    } as unknown as FastifyReply;

    await sequelizeSetupDB();
  });

  it("should list users and return 200 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    const { data } = await createUserController.handle(request, resply);

    request = {
      query: {},
    } as unknown as FastifyRequest;

    await listUsersController.handle(request, resply);
    expect(resply.statusCode).toBe(200);
    //@ts-expect-error
    expect(resply.data).toEqual({
      current_page: 1,
      items: [
        {
          //@ts-expect-error
          id: data.id,
          name: "user",
          email: "user@example.com",
          //@ts-expect-error
          created_at: data.created_at,
          //@ts-expect-error
          updated_at: data.updated_at,
        },
      ],
      last_page: 1,
      per_page: 15,
      total: 1,
    });
  });
});
