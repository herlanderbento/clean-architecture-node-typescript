import { Container } from "inversify";
import { CreateUserUseCase } from "@m27/the-food/src/user/application";
import HashProvider from "../../../../@core/src/@seedwork/application/providers/hash-provider";
import {
  BcryptjsHashProvider,
  InputValidateProvider,
  UserSequelize,
} from "@m27/the-food/src/user/infra";
import { ValidateProvider } from "@m27/the-food/src/@seedwork/application";

export const USER_REGITRY = {
  HASH_PROVIDER: Symbol.for("HASH_PROVIDER"),
  VALIDATE_PROVIDER: Symbol.for("VALIDATE_PROVIDER"),

  // adapters
  UserModelAdapter: Symbol.for("UserModelAdapter"),

  /**
   * User Repository
   * User Usecase
   */
  UserRepository: Symbol.for("UserRepository"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
};

const hashProvider: HashProvider = new BcryptjsHashProvider();
const validateProvider: ValidateProvider = new InputValidateProvider();

export const USER_CONTAINER = new Container();

USER_CONTAINER.bind(USER_REGITRY.HASH_PROVIDER).toConstantValue(hashProvider);
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
