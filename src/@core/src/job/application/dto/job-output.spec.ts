import { Job } from "../../domain";
import { JobOutputMapper } from "./job-output";

describe("JobOutputMapper unit tests", () => {
  it("should convert a category in output", () => {
    const created_at = new Date();

    const entity = new Job({
      name: "movie",
      description: "some description",
      is_active: true,
      created_at,
    });

    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = JobOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: "movie",
      description: "some description",
      is_active: true,
      created_at,
    });
  });
});
