import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { DeleteJobUseCase } from "../../delete-job.use-case";
import { JobSequelize } from "../../../../infra";
import { setupSequelize } from "#seedwork/infra";

const { JobModel, JobRepository } = JobSequelize;

describe("DeleteJobUseCase Integration Tests", () => {
  let useCase: DeleteJobUseCase.UseCase;
  let repository: JobSequelize.JobRepository;

  setupSequelize({ models: [JobModel] });

  beforeEach(() => {
    repository = new JobRepository(JobModel);
    useCase = new DeleteJobUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a job", async () => {
    const model = await JobModel.factory().create();
    await useCase.execute({
      id: model.id,
    });
    const noHasModel = await JobModel.findByPk(model.id);
    expect(noHasModel).toBeNull();
  });
});
