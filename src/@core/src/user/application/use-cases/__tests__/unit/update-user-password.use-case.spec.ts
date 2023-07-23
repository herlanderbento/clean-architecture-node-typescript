import { NotFoundError } from "#seedwork/domain";
import { BcryptjsHashProvider, InputValidateProvider } from "../../../../infra";
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository";
import UpdateUserPasswordUseCase from "../../update-user-password.use-case";
import { User } from "../../../../domain/entities/user";
import { InvalidPasswordError } from "#seedwork/application";

describe("UpdateUserPasswordUseCase unit tests", () => {
  let repository: UserInMemoryRepository;
  let hashProvider: BcryptjsHashProvider;
  let useCase: UpdateUserPasswordUseCase.UseCase;
  let validateProvider: InputValidateProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    validateProvider = new InputValidateProvider();
    useCase = new UpdateUserPasswordUseCase.UseCase(
      repository,
      hashProvider,
      validateProvider
    );
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({
        id: "fake id",
        oldPassword: "123456",
        password: "12222",
      })
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it("should throw error when old password is empty", async () => {
    const entity = new User({
      name: "john",
      email: "email@example.com",
      password: "password",
    });
    await repository.create(entity);
    await expect(() =>
      useCase.execute({
        id: entity.id,
        oldPassword: "",
        password: "password",
      })
    ).rejects.toThrow(new InvalidPasswordError("Old password is required"));
  });

  it("should throw error when password is empty", async () => {
    const entity = new User({
      name: "john",
      email: "email@example.com",
      password: "password",
    });
    await repository.create(entity);
    await expect(() =>
      useCase.execute({
        id: entity.id,
        oldPassword: "password",
        password: "",
      })
    ).rejects.toThrow(new InvalidPasswordError("New password is required"));
  });

  it("should throw error when the new password is the same as the old password", async () => {
    const entity = new User({
      name: "john",
      email: "email@example.com",
      password: "password",
    });
    await repository.create(entity);
    await expect(() =>
      useCase.execute({
        id: entity.id,
        oldPassword: "password",
        password: "password",
      })
    ).rejects.toThrow(
      new InvalidPasswordError(
        "Password should be different from old password!"
      )
    );
  });

  it("should throw error when old password does not match", async () => {
    const passwordHash = await hashProvider.generateHash("password123");
    const entity = new User({
      name: "john",
      email: "email@example.com",
      password: passwordHash,
    });
    await repository.create(entity);
    await expect(() =>
      useCase.execute({
        id: entity.id,
        oldPassword: "password22",
        password: "password",
      })
    ).rejects.toThrow(new InvalidPasswordError("Password does not match"));
  });

  it("should update a password", async () => {
    const passwordHash = await hashProvider.generateHash("password");
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new User({
      name: "john",
      email: "email@example.com",
      password: passwordHash,
    });
    await repository.create(entity);
    const result = await useCase.execute({
      id: entity.id,
      oldPassword: "password",
      password: "password123",
    });
    const checkNewPassword = await hashProvider.compareHash(
      "password123",
      result.password
    );
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
    expect(checkNewPassword).toBeTruthy();
  });
});
