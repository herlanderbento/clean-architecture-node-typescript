import { JobSequelize } from "../job-sequelize";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { Job } from '../../../../domain/entities/job';

describe("JobModelMapper", () => {
  setupSequelize({ models: [JobSequelize.JobModel] });
  let repository: JobSequelize.JobRepository;

  beforeEach(async () => {
    repository = new JobSequelize.JobRepository(JobSequelize.JobModel);
  });

  it("should throws error when job is invalid", () => {
    const model = JobSequelize.JobModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
    });
    try {
      JobSequelize.JobModelMapper.toEntity(model);
      fail("The job is valid , but it needs throws a LoadEntityError");
    } catch (err) {
      expect(err).toBeInstanceOf(LoadEntityError);
      expect(err.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Job, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = JobSequelize.JobModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
    });
    expect(() => JobSequelize.JobModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a job model to a job entity", () => {
    const created_at = new Date();
    const model = JobSequelize.JobModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
      name: "some name",
      description: "some description",
      is_active: true,
      created_at,
    });
    const entity = JobSequelize.JobModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Job(
        {
          name: "some name",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("025a9698-d6a6-43fa-943f-3a2b21b6709a")
      ).toJSON()
    );
  });
});
