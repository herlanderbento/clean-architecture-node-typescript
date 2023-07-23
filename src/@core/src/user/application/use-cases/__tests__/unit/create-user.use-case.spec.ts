import {
  BcryptjsHashProvider,
  InputValidateProvider,
} from "../../../../infra/providers";
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "../../create-user.use-case";

describe("CreateUserUseCase unit tests", () => {
  let repository: UserInMemoryRepository;
  let hashProvider: BcryptjsHashProvider;
  let validateProvider: InputValidateProvider;
  let useCase: CreateUserUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    validateProvider = new InputValidateProvider();
    useCase = new CreateUserUseCase.UseCase(
      repository,
      hashProvider,
      validateProvider
    );
  });

  it("should create a user", async () => {
    const spyCreate = jest.spyOn(repository, "create");
    const output = await useCase.execute({
      name: "test",
      email: "test@example.com",
      password: "test",
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      email: "test@example.com",
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
