import { CustomError } from "#seedwork/domain";
import UserInMemoryRepository from "./user-in-memory.repository";
import { User } from "../../../domain/entities/user";

describe("UserInMemoryRepository unit tests", () => {
  let repository: UserInMemoryRepository;

  beforeEach(() => (repository = new UserInMemoryRepository()));

  // it("should throws error when entity is not found - findByEmail method", async () => {
  //   const errorMessage = "User not found";
  //   await expect(
  //     repository.findByEmail("email@gmail.com", errorMessage)
  //   ).rejects.toThrow(new NotFoundError(`${errorMessage}`));
  // });

  it("should find a entity by email", async () => {
    const entity = new User({
      name: "John",
      email: "email@gmail.com",
      password: "password",
    });
    await repository.create(entity);
    const result = await repository.findByEmail(entity.email);
    expect(result.toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should throw error when user already exists", async () => {
    const entity = new User({
      name: "John",
      email: "email@gmail.com",
      password: "password",
    });
    await repository.create(entity);
    await expect(
      repository.findByEmailAlreadyExists(entity.email)
    ).rejects.toThrow(new CustomError("User already exists"));
  });

  it("should no filter items when filter object is null", async () => {
    const items = [
      new User({
        name: "user",
        email: "user@gmail.com",
        password: "password",
      }),
    ];
    const spyFilterMethod = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(spyFilterMethod).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using a filter parameter", async () => {
    const items = [
      new User({ name: "user", email: "user@gmail.com", password: "password" }),
      new User({ name: "USER", email: "user@gmail.com", password: "password" }),
      new User({ name: "fake", email: "fake@gmail.com", password: "password" }),
    ];
    const spyFilterMethod = jest.spyOn(items, "filter" as any);
    let itemsFiltered = await repository["applyFilter"](items, "USER");
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const items = [
      new User({
        name: "user",
        email: "user@gmail.com",
        password: "password",
        created_at,
      }),
      new User({
        name: "USER",
        email: "user@gmail.com",
        password: "password",
        created_at: new Date(created_at.getTime() + 100),
      }),
      new User({
        name: "fake",
        email: "fake@gmail.com",
        password: "password",
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });
});
