import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { GetJobUseCase } from "../../get-job.use-case";
import { JobSequelize } from "../../../../infra";
import { setupSequelize } from "#seedwork/infra";

const { JobModel, JobRepository } = JobSequelize;

describe("GetJobUseCase Integration Tests", () => {
  let useCase: GetJobUseCase.UseCase;
  let repository: JobSequelize.JobRepository;

  setupSequelize({ models: [JobModel] });

  beforeEach(() => {
    repository = new JobRepository(JobModel);
    useCase = new GetJobUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a job", async () => {
    const model = await JobModel.factory().create();
    const output = await useCase.execute({ id: model.id });
    expect(output).toStrictEqual({
      id: model.id,
      //@ts-ignore
      name: model.name,
      //@ts-ignore
      description: model.description,
      //@ts-ignore
      is_active: model.is_active,
      //@ts-ignore
      created_at: model.created_at,
    });
  });
});
