import { AuthenticateUserController } from "../../authenticate-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";
import CreateUserController from "../../create-user.controller";
import { FastifyReply, FastifyRequest } from "fastify";

describe("AuthenticateUserController unit tests", () => {
  let resply: FastifyReply;
  let createUsercontroller: CreateUserController.Controller;
  let authenticateUserController: AuthenticateUserController.Controller;

  beforeEach(async () => {
    createUsercontroller = new CreateUserController.Controller();
    authenticateUserController = new AuthenticateUserController.Controller();

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

  it("should authenticate a user and return 201 status", async () => {
    let request = {
      body: {
        name: "user",
        email: "user@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    await createUsercontroller.handle(request, resply);

    request = {
      body: {
        email: "user@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    const output = await authenticateUserController.handle(request, resply);
    expect(resply.statusCode).toBe(200);
    //@ts-expect-error
    expect(resply.data).toStrictEqual({
      //@ts-expect-error
      token: output.data.token,
      user: {
        name: "user",
        email: "user@example.com",
      },
    });
  });
});
