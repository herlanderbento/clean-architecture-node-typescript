import { DeleteUserController } from "../../delete-user.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";
import { FastifyReply, FastifyRequest } from "fastify";

describe("DeleteUserController unit test", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;
  let deleteUserController = new DeleteUserController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    deleteUserController = new DeleteUserController.Controller();

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

  it("should delete a user and return 200 status", async () => {
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

    await deleteUserController.handle(request, resply);
    expect(resply.statusCode).toBe(200);
  });
});
