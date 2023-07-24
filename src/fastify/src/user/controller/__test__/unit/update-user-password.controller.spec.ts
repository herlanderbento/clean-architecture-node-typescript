import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserPasswordController } from "../../update-user-password.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("UpdateUserPasswordController unit test", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;
  let updateUserPasswordController =
    new UpdateUserPasswordController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    updateUserPasswordController =
      new UpdateUserPasswordController.Controller();

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

  it("should update a user and return 200 status", async () => {
    let request = {
      body: {
        name: "eugenia gaieta",
        email: "eugenia@example.com",
        password: "test123",
      },
    } as FastifyRequest;

    const { data } = await createUserController.handle(request, resply);
    expect(resply.statusCode).toBe(201);

    request = {
      params: {
        //@ts-expect-error
        id: data.id,
      },
      body: {
        oldPassword: "test123",
        password: "eugeniapassword",
      },
    } as unknown as FastifyRequest;

    const { data: output } = await updateUserPasswordController.handle(
      request,
      resply
    );
    expect(resply.statusCode).toBe(200);
    //@ts-expect-error
    expect(resply.data).toEqual({
      //@ts-expect-error
      id: output.id,
      name: "eugenia gaieta",
      email: "eugenia@example.com",
      //@ts-expect-error
      password: output.password,
      //@ts-expect-error
      created_at: output.created_at,
      //@ts-expect-error
      updated_at: output.updated_at,
    });
  });
});
