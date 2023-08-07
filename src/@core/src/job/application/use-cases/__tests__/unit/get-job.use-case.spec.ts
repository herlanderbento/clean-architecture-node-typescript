import { Job } from "../../../../domain/entities/job";
import { JobInMemoryRepository } from "../../../../infra/db/in-memory/job-in-memory.repository";
import { GetJobUseCase } from "../../get-job.use-case";
import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";

describe("GetJobUseCase Unit Tests", () => {
  let repository: JobInMemoryRepository;
  let useCase: GetJobUseCase.UseCase;
  beforeEach(() => {
    repository = new JobInMemoryRepository();
    useCase = new GetJobUseCase.UseCase(repository);
  });
  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });
  it("should returns a category", async () => {
    const items = [new Job({ name: "Software Engineer" })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Software Engineer",
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
  });
});
