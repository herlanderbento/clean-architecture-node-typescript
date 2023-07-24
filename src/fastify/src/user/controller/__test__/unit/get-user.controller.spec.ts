import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserController } from "../../get-user.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("GetUserController unit test", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;
  let getUserController = new GetUserController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    getUserController = new GetUserController.Controller();

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

  it("should get a user and return 200 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    const { data } = await createUserController.handle(request, resply);

    request = {
      params: {
        //@ts-expect-error
        id: data.id,
      },
    } as unknown as FastifyRequest;

    await getUserController.handle(request, resply);
    expect(resply.statusCode).toBe(200);
    //@ts-expect-error
    expect(resply.data).toEqual({
      //@ts-expect-error
      id: data.id,
      name: "user",
      email: "user@example.com",
      //@ts-expect-error
      created_at: data.created_at,
      //@ts-expect-error
      updated_at: data.updated_at,
    });
  });
});
