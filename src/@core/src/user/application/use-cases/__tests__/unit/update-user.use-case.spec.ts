import { UpdateUserUseCase } from "../../update-user.use-case";
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository";
import { NotFoundError } from "#seedwork/domain";
import { User } from "../../../../domain";

describe("UpdateUserUseCase unit tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: UpdateUserUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new UpdateUserUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({
        id: "fake id",
        name: "fake",
        email: "fake@email.gmail.com",
      })
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it("should update a user", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new User({
      name: "eugenia gaieta",
      email: "eugenia@gmail.com",
      password: "password",
    });
    repository.items = [entity];
    let output = await useCase.execute({
      id: entity.id,
      name: "herlander bento",
      email: "eugenia@gmail.com",
    });

    expect(output).toStrictEqual({
      id: entity.id,
      name: "herlander bento",
      email: "eugenia@gmail.com",
      created_at: entity.created_at,
      updated_at: output.updated_at,
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});
