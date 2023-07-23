import { User, UserRepository } from "../../../../domain";
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository";
import ListUsersUseCase from "../../list-users.use-case";

describe("ListUsersUseCase Unit Tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: ListUsersUseCase.UseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new ListUsersUseCase.UseCase(repository);
  });

  test("toOuput method", () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new User({
      name: "eugenia gaieta",
      email: "eugenia@gmail.com",
      password: "password",
    });
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [entity.toShortJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should return output sorted by created_at when input param is empty", async () => {
    const items = [
      new User({
        name: "herlander bento",
        email: "herlander@gmail.com",
        password: "password",
      }),
      new User({
        name: "eugenia gaieta bento",
        email: "eugenia@gmail.com",
        password: "password",
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    // console.log(output);
    expect(output).toStrictEqual({
      items: [...items].reverse().map((item) => item.toShortJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const items = [
      new User({
        name: "herlander",
        email: "herlander@gmail.com",
        password: "password",
      }),
      new User({
        name: "HERLANDER",
        email: "HERLANDER@gmail.com",
        password: "password",
      }),
      new User({
        name: "HErLANDER",
        email: "HErLANDER@gmail.com",
        password: "password",
      }),
      new User({
        name: "eugenia",
        email: "eugenia@gmail.com",
        password: "password",
        created_at: new Date(new Date().getTime() + 100),
      }),
      new User({
        name: "antonio",
        email: "antonio@gmail.com",
        password: "password",
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "her",
    });
    expect(output).toStrictEqual({
      items: [items[1].toShortJSON(), items[2].toShortJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
    // console.log(output);

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "her",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });
    // console.log(output);

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "her",
    });
    expect(output).toStrictEqual({
      items: [items[0].toShortJSON(), items[2].toShortJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "eu",
    });
    expect(output).toStrictEqual({
      items: [items[3].toShortJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
    // console.log(output);
  });
});
