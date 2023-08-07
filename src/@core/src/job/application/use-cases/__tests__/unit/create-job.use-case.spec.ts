import { JobInMemoryRepository } from "../../../../infra/db/in-memory/job-in-memory.repository";
import { CreateJobUseCase } from "../../create-job.use-case";

describe("CreateJobUseCase Unit Tests", () => {
  let repository: JobInMemoryRepository;
  let useCase: CreateJobUseCase.UseCase;

  beforeEach(() => {
    repository = new JobInMemoryRepository();
    useCase = new CreateJobUseCase.UseCase(repository);
  });
  it("should create a job", async () => {
    const spyInsert = jest.spyOn(repository, "create");
    let output = await useCase.execute({ name: "test" });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "test",
      description: "some description",
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
