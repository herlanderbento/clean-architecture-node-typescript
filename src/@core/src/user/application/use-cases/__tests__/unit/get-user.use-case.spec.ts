import { NotFoundError } from "#seedwork/domain";
import { User } from "../../../../domain";
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository";
import GetUserUseCase from "../../get-user.use-case";

describe("GetUserUseCase Unit Tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: GetUserUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a user", async () => {
    const entity = new User({
      name: "jorge",
      email: "jorge@gmail.com",
      password: "password",
    });
    const spyFindById = jest.spyOn(repository, "findById");
    await repository.create(entity);
    const output = await useCase.execute({ id: entity.id });
    
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "jorge",
      email: "jorge@gmail.com",
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
