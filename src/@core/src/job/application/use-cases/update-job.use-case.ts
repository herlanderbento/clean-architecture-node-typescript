import { JobRepository } from "../../domain/repository/job.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases/use-cases";
import { JobOutput, JobOutputMapper } from "../dto/job-output";

export namespace UpdateJobUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(private jobRepository: JobRepository.Repository) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.jobRepository.findById(input.id);
      entity.update(input.name, input.description);

      if (input.is_active === true) {
        entity.activate();
      }

      if (input.is_active === false) {
        entity.deactivate();
      }

      await this.jobRepository.update(entity);

      return JobOutputMapper.toOutput(entity);
    }
  }

  export type Input = Omit<JobOutput, "created_at">;

  export type Output = JobOutput;
}

export default UpdateJobUseCase;
