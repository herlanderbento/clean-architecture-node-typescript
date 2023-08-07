import { omit } from "lodash";
import { Job, JobId, JobProperties } from "../job";

interface JobData {
  props: JobProperties;
  id?: JobId | null;
}

describe("Job unit tests", () => {
  beforeEach(() => {
    Job.validate = jest.fn();
  });
  test("Constructor of job", () => {
    Job.validate = jest.fn();
    let job = new Job({
      name: "Software Developer",
    });

    expect(Job.validate).toHaveBeenCalled();

    let props = omit(job.props, "created_at");
    expect(props).toMatchObject({
      name: "Software Developer",
      description: null,
      is_active: true,
    });
    expect(job.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    job = new Job({
      name: "Software Developer",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(job.props).toStrictEqual({
      name: "Software Developer",
      description: "some description",
      is_active: false,
      created_at,
    });

    job = new Job({
      name: "Software Developer",
      description: "other description",
    });
    expect(job.props).toMatchObject({
      name: "Software Developer",
      description: "other description",
    });

    job = new Job({
      name: "Software Developer",
      is_active: true,
    });
    expect(job.props).toMatchObject({
      name: "Software Developer",
      is_active: true,
    });

    created_at = new Date();
    job = new Job({
      name: "Software Developer",
      created_at,
    });
    expect(job.props).toMatchObject({
      name: "Software Developer",
      created_at,
    });
  });

  test("id field", () => {
    const data: JobData[] = [
      { props: { name: "Software Developer" } },
      { props: { name: "Software Developer" }, id: null },
      { props: { name: "Software Developer" }, id: undefined },
      { props: { name: "Software Developer" }, id: new JobId() },
    ];

    data.forEach((item) => {
      const job = new Job(item.props, item.id as any);
      expect(job.id).not.toBeNull();
      expect(job.entityId).toBeInstanceOf(JobId);
    });
  });

  test("getter of name field", () => {
    const job = new Job({
      name: "Software Developer",
    });
    expect(job.name).toBe("Software Developer");
  });

  test("getter and setter of description field", () => {
    let job = new Job({
      name: "Software Developer",
    });
    expect(job.description).toBeNull();

    job = new Job({
      name: "Software Developer",
      description: "some description",
    });
    expect(job.description).toBe("some description");

    job = new Job({
      name: "Software Developer",
    });

    job["description"] = "other description";
    expect(job.description).toBe("other description");

    job["description"] = undefined;
    expect(job.description).toBeNull();

    job["description"] = null;
    expect(job.description).toBeNull();
  });

  test("getter and setter of is_active field", () => {
    let job = new Job({
      name: "Software Developer",
    });
    expect(job.is_active).toBeTruthy();

    job = new Job({
      name: "Software Developer",
      is_active: true,
    });

    expect(job.is_active).toBeTruthy();

    job = new Job({
      name: "Software Developer",
      is_active: false,
    });

    expect(job.is_active).toBeFalsy();
  });

  test("getter and setter of created_at field", () => {
    let job = new Job({
      name: "Software Developer",
    });
    expect(job.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    job = new Job({
      name: "Software Developer",
      created_at,
    });
    expect(job.created_at).toBe(created_at);
  });

  test("should update a job", () => {
    const job = new Job({ name: "Software Developer" });
    job.update("Documentary", "some description");
    expect(Job.validate).toHaveBeenCalledTimes(2);
    expect(job.name).toBe("Documentary");
    expect(job.description).toBe("some description");
  });

  test("should active a job", () => {
    const job = new Job({
      name: "Backend Developer",
      is_active: false,
    });
    job.activate();
    expect(job.is_active).toBeTruthy();
  });

  test("should disable a job", () => {
    const job = new Job({
      name: "Backend D",
      is_active: true,
    });
    job.deactivate();
    expect(job.is_active).toBeFalsy();
  });
});
