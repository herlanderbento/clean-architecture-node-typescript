import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserRepository } from "../../domain/repository/user.repository";
import {
  HashProvider,
  ValidateProvider,
} from "../../../@seedwork/application/providers";
import { UserOutputMapper, UserPropsDto } from "../dto";

export namespace UpdateUserPasswordUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
      private validateProvider: ValidateProvider
    ) {}

    public async execute({
      id,
      oldPassword,
      password,
    }: Input): Promise<Output> {
      const entity = await this.userRepository.findById(id);

      this.validateProvider.updatePassword(oldPassword, password);

      await this.hashProvider.oldPasswordMatches(oldPassword, entity.password);

      const passwordHash = await this.hashProvider.generateHash(password);

      entity.updatePassword(passwordHash);

      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserPropsDto;
}
export default UpdateUserPasswordUseCase;
