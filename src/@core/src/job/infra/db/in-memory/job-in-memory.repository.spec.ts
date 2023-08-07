import { Job } from "../../../domain/entities";
import JobInMemoryRepository from "./job-in-memory.repository";

describe("JobInMemoryRepository", () => {
  let repository: JobInMemoryRepository;

  beforeEach(() => (repository = new JobInMemoryRepository()));

  it("should no filter items when filter object is null", async () => {
    const items = [new Job({ name: "test" })];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using a filter parameter", async () => {
    const items = [
      new Job({ name: "test" }),
      new Job({ name: "TEST" }),
      new Job({ name: "fake" }),
    ];
    const spyFilterMethod = jest.spyOn(items, "filter" as any);
    let itemsFiltered = await repository["applyFilter"](items, "TEST");

    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const items = [
      new Job({ name: "test", created_at: created_at }),
      new Job({
        name: "TEST",
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Job({
        name: "fake",
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });
});
