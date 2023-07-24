import {
  BadRequestError,
  InvalidCredentialsError,
} from "#seedwork/application";
import { User } from "../../../../domain";
import {
  BcryptjsHashProvider,
  UserInMemoryRepository,
  JwtTokenProvider,
  InputValidateProvider,
} from "../../../../infra";
import AutenticateUserUseCase from "../../autenticate-user.use-case";

describe("AutenticateUserUseCase unit test", () => {
  let repository: UserInMemoryRepository;
  let hashProvider: BcryptjsHashProvider;
  let tokenProvier: JwtTokenProvider;
  let validateProvider: InputValidateProvider;
  let useCase: AutenticateUserUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    tokenProvier = new JwtTokenProvider();
    validateProvider = new InputValidateProvider();
    useCase = new AutenticateUserUseCase.UseCase(
      repository,
      hashProvider,
      tokenProvier,
      validateProvider
    );
  });

  it("should authenticate a user", async () => {
    const spyFindByEmail = jest.spyOn(repository, "findByEmail");
    const passwordHash = await hashProvider.generateHash("password");
    const entity = new User({
      name: "herlander",
      email: "herlander@gmail.com",
      password: passwordHash,
    });

    await repository.create(entity);

    const result = await useCase.execute({
      email: "herlander@gmail.com",
      password: "password",
    });

    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      token: result.token,
      user: {
        name: "herlander",
        email: "herlander@gmail.com",
      },
    });
  });

  it("should throw error when email is empty", async () => {
    await expect(
      useCase.execute({
        email: "",
        password: "password",
      })
    ).rejects.toThrow(new BadRequestError("Email should not be empty"));
  });

  it("should throw error when password is empty", async () => {
    await expect(
      useCase.execute({
        email: "hello@example.com",
        password: "",
      })
    ).rejects.toThrow(new BadRequestError("Password should not be empty"));
  });

  it("should not be able to authenticate when user is invalid", async () => {
    await expect(
      useCase.execute({
        email: "herlander@gmail.com",
        password: "password",
      })
    ).rejects.toThrow(
      new InvalidCredentialsError("Email or password incorrect!")
    );
  });

  it("should not be able to authenticate when email and password is invalid", async () => {
    const passwordHash = await hashProvider.generateHash("password");
    const entity = new User({
      name: "Herlander",
      email: "herlander@gmail.com",
      password: passwordHash,
    });

    await repository.create(entity);

    await expect(
      useCase.execute({
        email: "herlander@gmail.com",
        password: "fakepassword",
      })
    ).rejects.toThrow(
      new InvalidCredentialsError("Email or password incorrect!")
    );

    await expect(
      useCase.execute({
        email: "fake@example.com",
        password: "password",
      })
    ).rejects.toThrow(
      new InvalidCredentialsError("Email or password incorrect!")
    );
  });
});
