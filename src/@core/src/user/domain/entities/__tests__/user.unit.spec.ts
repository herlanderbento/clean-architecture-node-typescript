import { omit } from "lodash";
import { User, UserId, UserProperties } from "../user";

type UserData = {
  props: UserProperties;
  id?: UserId | null;
};

describe("User unit tests", () => {
  beforeEach(() => {
    User.validate = jest.fn();
  });

  test("Constructor of user", () => {
    User.validate = jest.fn();

    let user = new User({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "password",
    });

    expect(User.validate).toHaveBeenCalled();

    let props = omit(user.props, "created_at", "updated_at");

    expect(props).toMatchObject({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "password",
    });
    expect(user.props.created_at).toBeInstanceOf(Date);
    expect(user.props.updated_at).toBeInstanceOf(Date);

    let created_at = new Date();
    let updated_at = new Date();

    user = new User({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "password",
      created_at,
      updated_at,
    });

    expect(user.props).toStrictEqual({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "password",
      created_at,
      updated_at,
    });
  });

  test("id fields", () => {
    const data: UserData[] = [
      {
        props: {
          name: "Jorge Neto",
          email: "jorgeneto@example.com",
          password: "password",
        },
      },
      {
        props: {
          name: "Marcia Gaieta",
          email: "marciagaieta@example.com",
          password: "password",
        },
        id: null,
      },
      {
        props: {
          name: "Antonio Gabriel",
          email: "antoniogabriel@example.com",
          password: "password",
        },
        id: undefined,
      },
      {
        props: {
          name: "Paulo Estevao",
          email: "pauloestevao@example.com",
          password: "password",
        },
        id: new UserId(),
      },
    ];

    data.forEach((item) => {
      const user = new User(item.props, item.id);
      expect(user.id).not.toBeNull();
      expect(user.entityId).toBeInstanceOf(UserId);
    });
  });

  test("getter and setters name, email, password fields", () => {
    let user = new User({
      name: "klenio",
      email: "klenio@gmail.com",
      password: "password",
    });
    expect(user.name).toBe("klenio");
    expect(user.email).toBe("klenio@gmail.com");
    expect(user.password).toBe("password");

    user = new User({
      name: "Josue",
      email: "josue@gmail.com",
      password: "password",
    });

    user["name"] = "Wilson";
    user["email"] = "wilson@gmail.com";
    user["password"] = "password123";

    expect(user.name).toBe("Wilson");
    expect(user.email).toBe("wilson@gmail.com");
    expect(user.password).toBe("password123");
  });

  test("getter and setter of created_at field", () => {
    let user = new User({
      name: "Marcia",
      email: "marcia@gmail.com",
      password: "password",
    });
    expect(user.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    user = new User({
      name: "Marcia",
      email: "marcia@gmail.com",
      password: "password",
      created_at,
    });
    expect(user.created_at).toBe(created_at);
  });

  it("should update a user", () => {
    const user = new User({
      name: "antonio",
      email: "antonio@gmail.com",
      password: "password",
    });

    user.update("Paulo", "paulo@gmail.com");
    expect(User.validate).toHaveBeenCalled();
    expect(user.name).toBe("Paulo");
    expect(user.email).toBe("paulo@gmail.com");
    expect(user.updated_at).toBeDefined()
  });

  it("should update a user password", () => {
    const user = new User({
      name: "jorge",
      email: "jorge@gmail.com",
      password: "password",
    });

    user.updatePassword("password123");
    expect(User.validate).toHaveBeenCalledTimes(2);
    expect(user.password).toBe("password123");
  });
});
