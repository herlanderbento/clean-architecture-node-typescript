import { NotFoundError } from "#seedwork/domain";
import { User } from "../../../../domain";
import { UserInMemoryRepository } from "../../../../infra";
import DeleteUserUseCase from "../../delete-user.use-case";

describe("DeleteUserUseCase unit tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: DeleteUserUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new DeleteUserUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a user", async () => {
    const items = [
      new User({
        name: "antonio gabriel",
        email: "antonio@gmail.com",
        password: "password",
      }),
    ];
    repository.items = items;

    await useCase.execute({ id: items[0].id });
    expect(repository.items).toHaveLength(0);
  });
});
