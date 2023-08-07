import { JobRepository } from "../../domain/repository/job.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";

export namespace DeleteJobUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(private categoryRepository: JobRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepository.findById(input.id);
      await this.categoryRepository.delete(entity.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}

export default DeleteJobUseCase;
