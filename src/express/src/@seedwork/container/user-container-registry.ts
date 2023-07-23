import { Container } from "inversify";
import {
  AutenticateUserUseCase,
  CreateUserUseCase,
} from "@m27/the-food/src/user/application";
import HashProvider from "../../../../@core/src/@seedwork/application/providers/hash-provider";
import {
  BcryptjsHashProvider,
  InputValidateProvider,
  JwtTokenProvider,
  UserSequelize,
} from "@m27/the-food/src/user/infra";
import { ValidateProvider } from "@m27/the-food/src/@seedwork/application";
import { TokenProvider } from "../../../../@core/dist/@seedwork/application/providers/token-provider";

export const USER_REGITRY = {
  HASH_PROVIDER: Symbol.for("HASH_PROVIDER"),
  VALIDATE_PROVIDER: Symbol.for("VALIDATE_PROVIDER"),
  TOKEN_PROVIDER: Symbol.for("TOKEN_PROVIDER"),

  // adapters
  UserModelAdapter: Symbol.for("UserModelAdapter"),

  /**
   * User Repository
   * User Usecase
   */
  UserRepository: Symbol.for("UserRepository"),
  AutenticateUserUseCase: Symbol.for("AutenticateUserUseCase"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
};

const hashProvider: HashProvider = new BcryptjsHashProvider();
const tokenProvider: TokenProvider = new JwtTokenProvider();
const validateProvider: ValidateProvider = new InputValidateProvider();

export const USER_CONTAINER = new Container();

USER_CONTAINER.bind(USER_REGITRY.HASH_PROVIDER).toConstantValue(hashProvider);
USER_CONTAINER.bind(USER_REGITRY.TOKEN_PROVIDER).toConstantValue(tokenProvider);
USER_CONTAINER.bind(USER_REGITRY.VALIDATE_PROVIDER).toConstantValue(
  validateProvider
);

USER_CONTAINER.bind(USER_REGITRY.UserModelAdapter).toConstantValue(
  UserSequelize.UserModel
);

// Repositories
USER_CONTAINER.bind(USER_REGITRY.UserRepository).toDynamicValue((context) => {
  return new UserSequelize.UserRepository(
    context.container.get(USER_REGITRY.UserModelAdapter)
  );
});

USER_CONTAINER.bind(USER_REGITRY.CreateUserUseCase).toDynamicValue(
  (context) => {
    return new CreateUserUseCase.UseCase(
      context.container.get(USER_REGITRY.UserRepository),
      context.container.get(USER_REGITRY.HASH_PROVIDER),
      context.container.get(USER_REGITRY.VALIDATE_PROVIDER)
    );
  }
);

USER_CONTAINER.bind(USER_REGITRY.AutenticateUserUseCase).toDynamicValue(
  (context) => {
    return new AutenticateUserUseCase.UseCase(
      context.container.get(USER_REGITRY.UserRepository),
      context.container.get(USER_REGITRY.HASH_PROVIDER),
      context.container.get(USER_REGITRY.TOKEN_PROVIDER),
      context.container.get(USER_REGITRY.VALIDATE_PROVIDER)
    );
  }
);
