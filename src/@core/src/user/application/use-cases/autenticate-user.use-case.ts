import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import {
  UserOutputMapper,
  UserPropsDto,
  UserTokenDto,
} from "../dto/user-output";
import { UserRepository } from "../../domain/repository/user.repository";
import {
  HashProvider,
  TokenProvider,
  ValidateProvider,
} from "../../../@seedwork/application/providers";
import { InvalidCredentialsError } from "../../../@seedwork/application/errors/invalid-crendials-error";
import authConfig from "../../../@seedwork/application/config/auth.config";

export namespace AutenticateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
      private tokenProvider: TokenProvider,
      private validateProvider: ValidateProvider
    ) {}

    public async execute({ email, password }: Input): Promise<Output> {
      this.validateProvider.authenticate(email, password);

      const entity = await this.userRepository.findByEmail(email);

      if (!entity) {
        throw new InvalidCredentialsError("Email or password incorrect!");
      }

      const passwordMatch = await this.hashProvider.compareHash(
        password,
        entity.password
      );

      if (!passwordMatch) {
        throw new InvalidCredentialsError("Email or password incorrect!");
      }

      const payload = { id: entity.id };

      const token = this.tokenProvider.createToken(
        payload,
        authConfig.secret_token,
        authConfig.expires_in_token,
        authConfig.subject
      );

      const userToken = {
        name: entity.name,
        email: entity.email,
        token: token,
      };

      return UserOutputMapper.toOutputUserToken(userToken);
    }
  }

  export type Input = Pick<UserPropsDto, "email" | "password">;

  export type Output = Partial<UserTokenDto>;
}
export default AutenticateUserUseCase;
