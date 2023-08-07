import { JobRepository } from "../../domain/repository/job.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { JobOutput, JobOutputMapper } from "../dto/job-output";

export namespace GetJobUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(private jobRepository: JobRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.jobRepository.findById(input.id);

      return JobOutputMapper.toOutput(entity);
    }
  }

  export type Input = Pick<JobOutput, "id">;

  export type Output = JobOutput;
}

export default GetJobUseCase;
