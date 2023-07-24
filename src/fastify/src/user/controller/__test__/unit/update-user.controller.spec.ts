import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserController } from "../../update-user.controller";
import { CreateUserController } from "../../create-user.controller";
import { sequelizeSetupDB } from "../../../../@seedwork/db/sequelize/sequelize-setup-db";

describe("UpdateUserController unit test", () => {
  let resply: FastifyReply;
  let createUserController: CreateUserController.Controller;
  let updateUserController = new UpdateUserController.Controller();

  beforeEach(async () => {
    createUserController = new CreateUserController.Controller();
    updateUserController = new UpdateUserController.Controller();

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
        name: "user",
        email: "user@example.com",
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
        name: "eugenia gaieta",
        email: "eugenia@example.com",
        password: "eugeniapassword",
      },
    } as unknown as FastifyRequest;

    const { data: output } = await updateUserController.handle(request, resply);
    expect(resply.statusCode).toBe(200);
    //@ts-expect-error
    expect(resply.data).toEqual({
      //@ts-expect-error
      id: output.id,
      name: "eugenia gaieta",
      email: "eugenia@example.com",
      //@ts-expect-error
      created_at: output.created_at,
      //@ts-expect-error
      updated_at: output.updated_at,
    });
  });
});
