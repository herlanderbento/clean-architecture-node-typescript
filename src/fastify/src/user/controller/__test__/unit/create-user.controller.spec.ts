import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("CreateUserController unit tests", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
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

  it("should create a user and return 201 status", async () => {
    const request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    const { data } = await createUserController.handle(request, resply);
    expect(resply.statusCode).toBe(201);
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
