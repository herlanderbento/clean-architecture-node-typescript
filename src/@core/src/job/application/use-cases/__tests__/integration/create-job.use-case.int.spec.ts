import { setupSequelize } from "#seedwork/infra";
import { JobSequelize } from "../../../../infra";
import { CreateJobUseCase } from "../../create-job.use-case";

const { JobModel, JobRepository } = JobSequelize;

describe("CreateJobUseCase Integration Tests", () => {
  let useCase: CreateJobUseCase.UseCase;
  let repository: JobSequelize.JobRepository;

  setupSequelize({ models: [JobModel] });

  beforeEach(() => {
    repository = new JobRepository(JobModel);
    useCase = new CreateJobUseCase.UseCase(repository);
  });

  it("should create a job", async () => {
    let output = await useCase.execute({ name: "software engineer" });
    let entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "software engineer",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    output = await useCase.execute({
      name: "software engineer",
      description: "some description",
      is_active: false,
    });

    entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "software engineer",
      description: "some description",
      is_active: false,
      created_at: entity.created_at,
    });
  });
});
