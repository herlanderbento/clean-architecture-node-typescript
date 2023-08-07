import { Job } from "../../../../domain/entities/job";
import { JobInMemoryRepository } from "../../../../infra/db/in-memory/job-in-memory.repository";
import { DeleteJobUseCase } from "../../delete-job.use-case";
import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";

describe("DeleteJobUseCase Unit Tests", () => {
  let repository: JobInMemoryRepository;
  let useCase: DeleteJobUseCase.UseCase;

  beforeEach(() => {
    repository = new JobInMemoryRepository();
    useCase = new DeleteJobUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const items = [new Job({ name: "test 1" })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
