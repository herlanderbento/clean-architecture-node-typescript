import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserOutputMapper, UserPropsDto } from "../dto/user-output";
import { UserRepository } from "../../domain/repository/user.repository";
import {
  HashProvider,
  ValidateProvider,
} from "../../../@seedwork/application/providers";
import { User } from "../../domain";

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
      private validateProvider: ValidateProvider
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validateProvider.create(input);

      await this.userRepository.findByEmailAlreadyExists(input.email);

      const passwordHash = await this.hashProvider.generateHash(input.password);
      const entity = new User(Object.assign(input, { password: passwordHash }));

      await this.userRepository.create(entity);

      return UserOutputMapper.toOutputShortProps(entity);
    }
  }

  export type Input = Omit<UserPropsDto, "id" | "created_at" | "updated_at">;

  export type Output = Omit<UserPropsDto, "password">;
}
export default CreateUserUseCase;
