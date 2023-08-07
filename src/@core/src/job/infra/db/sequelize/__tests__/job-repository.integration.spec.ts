import { JobSequelize } from "../job-sequelize";
import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import _chance from "chance";
import { Job, JobId, JobRepository } from "../../../../domain";

const chance = _chance();
const {
  JobModel,
  JobModelMapper,
  JobRepository: JobSequelizeRepository,
} = JobSequelize;
describe("JobRepository integration tests", () => {
  setupSequelize({ models: [JobModel] });
  let repository: JobSequelize.JobRepository;

  beforeEach(async () => {
    repository = new JobSequelizeRepository(JobModel);
  });

  it("should create a new Job", async () => {
    let job = new Job({ name: "Software Engineer" });
    console.log(job);
    await repository.create(job);
    let entity = await JobModel.findByPk(job.id);
    expect(entity.toJSON()).toStrictEqual(job.toJSON());

    job = new Job({
      name: "Software Engineer",
      description: "some description",
      is_active: false,
    });
    await repository.create(job);
    entity = await JobModel.findByPk(job.id);
    expect(entity.toJSON()).toStrictEqual(job.toJSON());
  });

  it("should throws error when entity is not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    await expect(
      repository.findById(new JobId("025a9698-d6a6-43fa-943f-3a2b21b6709a"))
    ).rejects.toThrow(
      new NotFoundError(
        "Entity Not Found using ID 025a9698-d6a6-43fa-943f-3a2b21b6709a"
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new Job({
      name: "Software Engineer",
      description: "some description",
      is_active: false,
    });
    await repository.create(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all jobs", async () => {
    const entity = new Job({
      name: "Software Engineer",
      description: "some description",
    });
    await repository.create(entity);
    const entities = await repository.findAll();
    expect(entities.length).toBe(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it("should throw error on update when a entity not found", async () => {
    const entity = new Job({ name: "Software Engineer" });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it("should update a entity", async () => {
    const entity = new Job({ name: "Software Engineer" });
    await repository.create(entity);

    entity.update("Software Engineer Update", entity.description);
    await repository.update(entity);
    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should throw on delete when a entity not found", async () => {
    await expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    await expect(
      repository.delete(new JobId("025a9698-d6a6-43fa-943f-3a2b21b6709a"))
    ).rejects.toThrowError(
      new NotFoundError(
        "Entity Not Found using ID 025a9698-d6a6-43fa-943f-3a2b21b6709a"
      )
    );
  });

  it("should delete a entity", async () => {
    const entity = new Job({ name: "Software Engineer" });
    await repository.create(entity);

    await repository.delete(entity.id);

    await expect(repository.findById(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  describe("search method tests", () => {
    it("should only paginate when other params are null", async () => {
      const created_at = new Date();
      await JobModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: chance.guid({ version: 4 }),
          name: "Software Engineer",
          description: "some description",
          is_active: true,
          created_at,
        }));
      const spyToEnyity = jest.spyOn(JobModelMapper, "toEntity");
      const searchOutput = await repository.search(
        new JobRepository.SearchParams()
      );
      expect(searchOutput).toBeInstanceOf(JobRepository.SearchResult);
      expect(searchOutput.total).toBe(16);
      expect(spyToEnyity).toHaveBeenCalledTimes(15);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      searchOutput.items.forEach((item) => {
        expect(item).toBeInstanceOf(Job);
        expect(item.id).toBeDefined();
      });
      expect(searchOutput.items.map((item) => item.toJSON())).toMatchObject(
        new Array(15).fill({
          name: "Software Engineer",
          description: "some description",
          is_active: true,
          created_at,
        })
      );
    });

    it("should order by created_at DESC when search params are null", async () => {
      const created_at = new Date();
      await JobModel.factory()
        .count(16)
        .bulkCreate((index) => ({
          id: chance.guid({ version: 4 }),
          name: `Software Engineer${index}`,
          description: "some description",
          is_active: true,
          created_at: new Date(created_at.getTime() + 100 + index),
        }));
      const searchOutput = await repository.search(
        new JobRepository.SearchParams()
      );
      searchOutput.items.reverse().forEach((item, index) => {
        expect(`${item.name}${index + 1}`);
      });
    });

    it("should apply paginate and filter", async () => {
      const jobs = [
        Job.fake()
          .aJob()
          .withName("test")
          .withCreatedAt(new Date(new Date().getTime() + 5000))
          .build(),
        Job.fake()
          .aJob()
          .withName("a")
          .withCreatedAt(new Date(new Date().getTime() + 4000))
          .build(),
        Job.fake()
          .aJob()
          .withName("TEST")
          .withCreatedAt(new Date(new Date().getTime() + 3000))
          .build(),
        Job.fake()
          .aJob()
          .withName("TeSt")
          .withCreatedAt(new Date(new Date().getTime() + 1000))
          .build(),
      ];

      await repository.bulkCreate(jobs);
      let searchOutput = await repository.search(
        new JobRepository.SearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new JobRepository.SearchResult({
          items: [jobs[0], jobs[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );

      searchOutput = await repository.search(
        new JobRepository.SearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new JobRepository.SearchResult({
          items: [jobs[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );
    });

    it("should apply paginate and sort", async () => {
      expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);

      const jobs = [
        Job.fake().aJob().withName("b").build(),
        Job.fake().aJob().withName("a").build(),
        Job.fake().aJob().withName("d").build(),
        Job.fake().aJob().withName("e").build(),
        Job.fake().aJob().withName("c").build(),
      ];
      await repository.bulkCreate(jobs);

      const arrange = [
        {
          params: new JobRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          result: new JobRepository.SearchResult({
            items: [jobs[1], jobs[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new JobRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          result: new JobRepository.SearchResult({
            items: [jobs[4], jobs[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new JobRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new JobRepository.SearchResult({
            items: [jobs[3], jobs[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
        {
          params: new JobRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new JobRepository.SearchResult({
            items: [jobs[4], jobs[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
      ];

      for (const i of arrange) {
        let result = await repository.search(i.params);
        expect(result.toJSON(true)).toMatchObject(i.result.toJSON(true));
      }
    });

    describe("should search using filter, sort and paginate", () => {
      const jobs = [
        Job.fake().aJob().withName("test").build(),
        Job.fake().aJob().withName("a").build(),
        Job.fake().aJob().withName("TEST").build(),
        Job.fake().aJob().withName("e").build(),
        Job.fake().aJob().withName("TeSt").build(),
      ];

      let arrange = [
        {
          search_params: new JobRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            filter: "TEST",
          }),
          search_result: new JobRepository.SearchResult({
            items: [jobs[2], jobs[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST",
          }),
        },
        {
          search_params: new JobRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            filter: "TEST",
          }),
          search_result: new JobRepository.SearchResult({
            items: [jobs[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST",
          }),
        },
      ];

      beforeEach(async () => {
        await repository.bulkCreate(jobs);
      });

      test.each(arrange)(
        "when value is $search_params",
        async ({ search_params, search_result }) => {
          let result = await repository.search(search_params);
          expect(result.toJSON(true)).toMatchObject(search_result.toJSON(true));
        }
      );
    });
  });
});
