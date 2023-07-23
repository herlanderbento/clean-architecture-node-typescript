import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserOutputMapper, UserPropsDto } from "../dto";
import { UserRepository } from "../../domain/repository/user.repository";

export namespace GetUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);

      return UserOutputMapper.toOutputShortProps(entity);
    }
  }

  export type Input = Pick<UserPropsDto, "id">;

  export type Output = Omit<UserPropsDto, "password">;
}
export default GetUserUseCase;
