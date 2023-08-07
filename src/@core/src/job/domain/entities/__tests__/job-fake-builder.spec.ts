import { Chance } from "chance";
import { JobFakeBuilder } from "../job-fake-builder";
import { JobId, Job } from '../job';

describe("JobFakeBuilder Unit Tests", () => {
  describe("entity_id prop", () => {
    const faker = JobFakeBuilder.aJob();

    it("should throw error when any with methods has called", () => {
      expect(() => faker["getValue"]("entity_id")).toThrow(
        new Error(
          "Property entity_id not have a factory, use 'with' methods"
        )
      );
    });

    it("should be undefined", () => {
      expect(faker["_entity_id"]).toBeUndefined();
    });

    test("withEntityId", () => {
      const jobId = new JobId();
      const $this = faker.withEntityId(jobId);
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_entity_id"]).toBe(jobId);

      faker.withEntityId(() => jobId);
      expect(faker["_entity_id"]()).toBe(jobId);

      expect(faker.entity_id).toBe(jobId);
    });

    it("should pass index to entity_id factory", () => {
      let mockFactory = jest.fn().mockReturnValue(new JobId());
      faker.withEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest.fn().mockReturnValue(new JobId());
      const fakerMany = JobFakeBuilder.theJobs(2);
      fakerMany.withEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  describe("name prop", () => {
    const faker = JobFakeBuilder.aJob();
    it("should be a function", () => {
      expect(typeof faker["_name"] === "function").toBeTruthy();
    });

    it("should call the word method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "word");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withName", () => {
      const $this = faker.withName("test name");
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_name"]).toBe("test name");

      faker.withName(() => "test name");
      //@ts-expect-error name is callable
      expect(faker["_name"]()).toBe("test name");

      expect(faker.name).toBe("test name");
    });

    it("should pass index to name factory", () => {
      faker.withName((index) => `test name ${index}`);
      const category = faker.build();
      expect(category.name).toBe(`test name 0`);

      const fakerMany = JobFakeBuilder.theJobs(2);
      fakerMany.withName((index) => `test name ${index}`);
      const jobs = fakerMany.build();

      expect(jobs[0].name).toBe(`test name 0`);
      expect(jobs[1].name).toBe(`test name 1`);
    });

    test("invalid empty case", () => {
      const $this = faker.withInvalidNameEmpty(undefined);
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_name"]).toBeUndefined();

      faker.withInvalidNameEmpty(null);
      expect(faker["_name"]).toBeNull();

      faker.withInvalidNameEmpty("");
      expect(faker["_name"]).toBe("");
    });

    test("invalid too long case", () => {
      const $this = faker.withInvalidNameTooLong();
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_name"].length).toBe(256);

      const tooLong = "a".repeat(256);
      faker.withInvalidNameTooLong(tooLong);
      expect(faker["_name"].length).toBe(256);
      expect(faker["_name"]).toBe(tooLong);
    });
  });

  describe("description prop", () => {
    const faker = JobFakeBuilder.aJob();
    it("should be a function", () => {
      expect(typeof faker["_description"] === "function").toBeTruthy();
    });

    it("should call the paragraph method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "paragraph");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withDescription", () => {
      const $this = faker.withDescription("test description");
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_description"]).toBe("test description");

      faker.withDescription(() => "test description");
      //@ts-expect-error description is callable
      expect(faker["_description"]()).toBe("test description");

      expect(faker.description).toBe("test description");
    });

    it("should pass index to description factory", () => {
      faker.withDescription((index) => `test description ${index}`);
      const category = faker.build();
      expect(category.description).toBe(`test description 0`);

      const fakerMany = JobFakeBuilder.theJobs(2);
      fakerMany.withDescription((index) => `test description ${index}`);
      const jobs = fakerMany.build();

      expect(jobs[0].description).toBe(`test description 0`);
      expect(jobs[1].description).toBe(`test description 1`);
    });
  });

  describe("is_active prop", () => {
    const faker = JobFakeBuilder.aJob();
    it("should be a function", () => {
      expect(typeof faker["_is_active"] === "function").toBeTruthy();
    });

    test("activate", () => {
      const $this = faker.activate();
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_is_active"]).toBeTruthy();
      expect(faker.is_active).toBeTruthy();
    });

    test("deactivate", () => {
      const $this = faker.deactivate();
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_is_active"]).toBeFalsy();
      expect(faker.is_active).toBeFalsy();
    });
  });

  describe("created_at prop", () => {
    const faker = JobFakeBuilder.aJob();

    it("should throw error when any with methods has called", () => {
      const fakerCategory = JobFakeBuilder.aJob();
      expect(() => fakerCategory.created_at).toThrow(
        new Error("Property created_at not have a factory, use 'with' methods")
      );
    });

    it("should be undefined", () => {
      expect(faker["_created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(JobFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["_created_at"]()).toBe(date);
      expect(faker.created_at).toBe(date);
    });

    it("should pass index to created_at factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const job = faker.build();
      expect(job.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = JobFakeBuilder.theJobs(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const jobs = fakerMany.build();

      expect(jobs[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(jobs[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });

  it("should create a jobs", () => {
    const faker = JobFakeBuilder.aJob();
    let jobs = faker.build();

    expect(jobs.entityId).toBeInstanceOf(JobId);
    expect(typeof jobs.name === "string").toBeTruthy();
    expect(typeof jobs.description === "string").toBeTruthy();
    expect(jobs.is_active).toBeTruthy();
    expect(jobs.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    const jobId = new JobId();
    jobs = faker
      .withEntityId(jobId)
      .withName("name test")
      .withDescription("description test")
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    expect(jobs.entityId.value).toBe(jobId.value);
    expect(jobs.name).toBe("name test");
    expect(jobs.description).toBe("description test");
    expect(jobs.is_active).toBeFalsy();
    expect(jobs.props.created_at).toEqual(created_at);
  });

  it("should create many jobs", () => {
    const faker = JobFakeBuilder.theJobs(2);
    let jobs = faker.build();

    jobs.forEach((job) => {
      expect(job.entityId).toBeInstanceOf(JobId);
      expect(typeof job.name === "string").toBeTruthy();
      expect(typeof job.description === "string").toBeTruthy();
      expect(job.is_active).toBeTruthy();
      expect(job.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();
    const jobId = new JobId();
    jobs = faker
      .withEntityId(jobId)
      .withName("name test")
      .withDescription("description test")
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    jobs.forEach((job) => {
      expect(job.entityId.value).toBe(jobId.value);
      expect(job.name).toBe("name test");
      expect(job.description).toBe("description test");
      expect(job.is_active).toBeFalsy();
      expect(job.props.created_at).toEqual(created_at);
    });
  });
});