import { UserOutputMapper, UserPropsDto } from "../dto";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserRepository } from "../../domain/repository/user.repository";

export namespace UpdateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      entity.update(input.name, input.email);

      await this.userRepository.update(entity);

      return UserOutputMapper.toOutputShortProps(entity);
    }
  }

  export type Input = Omit<UserPropsDto, "password" | "created_at" | "updated_at">;

  export type Output = Omit<UserPropsDto, "password">;
}
export default UpdateUserUseCase;
