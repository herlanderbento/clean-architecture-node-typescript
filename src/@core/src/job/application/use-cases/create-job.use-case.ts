import { Job, JobRepository } from "../../domain";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { JobOutput, JobOutputMapper } from "../dto/job-output";

export namespace CreateJobUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(private jobRepository: JobRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = new Job(input);

      await this.jobRepository.create(entity);

      return JobOutputMapper.toOutput(entity);
    }
  }

  export type Input = Omit<JobOutput, "id" | "created_at">;

  export type Output = JobOutput;
}

export default CreateJobUseCase;
