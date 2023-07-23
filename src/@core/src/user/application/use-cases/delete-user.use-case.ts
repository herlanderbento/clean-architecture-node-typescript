import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { UserRepository } from "../../domain/repository/user.repository";

export namespace DeleteUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    public async execute(input: Input): Promise<void> {
      const entity = await this.userRepository.findById(input.id);
      await this.userRepository.delete(entity.id);
    }
  }
  
  export type Input = { id: string };

  export type Output = void;
}
export default DeleteUserUseCase;
