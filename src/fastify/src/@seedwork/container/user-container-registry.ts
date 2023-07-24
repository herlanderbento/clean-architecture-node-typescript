import { Container } from "inversify";
import {
  AutenticateUserUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserPasswordUseCase,
  UpdateUserUseCase,
} from "@m27/the-food/src/user/application";
import {
  BcryptjsHashProvider,
  InputValidateProvider,
  JwtTokenProvider,
  UserSequelize,
} from "@m27/the-food/src/user/infra";
import {
  ValidateProvider,
  TokenProvider,
  HashProvider,
} from "@m27/the-food/src/@seedwork/application";

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
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  ListUsersUseCase: Symbol.for("ListUsersUseCase"),
  UpdateUserPasswordUseCase: Symbol.for("UpdateUserPasswordUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
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

//Authenticate User Use Case
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
//Create User Use Case
USER_CONTAINER.bind(USER_REGITRY.CreateUserUseCase).toDynamicValue(
  (context) => {
    return new CreateUserUseCase.UseCase(
      context.container.get(USER_REGITRY.UserRepository),
      context.container.get(USER_REGITRY.HASH_PROVIDER),
      context.container.get(USER_REGITRY.VALIDATE_PROVIDER)
    );
  }
);
//Delete User Use Case
USER_CONTAINER.bind<DeleteUserUseCase.UseCase>(
  USER_REGITRY.DeleteUserUseCase
).toDynamicValue((context) => {
  return new DeleteUserUseCase.UseCase(
    context.container.get(USER_REGITRY.UserRepository)
  );
});
//Get User Use Case
USER_CONTAINER.bind(USER_REGITRY.GetUserUseCase).toDynamicValue((context) => {
  return new GetUserUseCase.UseCase(
    context.container.get(USER_REGITRY.UserRepository)
  );
});

//List Users Use Case
USER_CONTAINER.bind(USER_REGITRY.ListUsersUseCase).toDynamicValue((context) => {
  return new ListUsersUseCase.UseCase(
    context.container.get(USER_REGITRY.UserRepository)
  );
});

//Update User Password Use Case
USER_CONTAINER.bind(USER_REGITRY.UpdateUserPasswordUseCase).toDynamicValue(
  (context) => {
    return new UpdateUserPasswordUseCase.UseCase(
      context.container.get(USER_REGITRY.UserRepository),
      context.container.get(USER_REGITRY.HASH_PROVIDER),
      context.container.get(USER_REGITRY.VALIDATE_PROVIDER)
    );
  }
);

//Update Users Use Case
USER_CONTAINER.bind(USER_REGITRY.UpdateUserUseCase).toDynamicValue(
  (context) => {
    return new UpdateUserUseCase.UseCase(
      context.container.get(USER_REGITRY.UserRepository)
    );
  }
);
