import UserValidatorFactory, { UserValidator } from "./user.validator";

describe("UserValidator unit tests", () => {
  let validator: UserValidator;

  beforeEach(() => (validator = UserValidatorFactory.create()));

  test("invalidation cases for name field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect({ validator, data: { name: 22 as any } }).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { name: "h".repeat(256) },
    }).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("invalidation cases for email field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      email: [
        "email should not be empty",
        "email must be an email",
        "email must be a string",
        "email must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { email: null } }).containsErrorMessages({
      email: [
        "email should not be empty",
        "email must be an email",
        "email must be a string",
        "email must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { email: "" } }).containsErrorMessages({
      email: ["email should not be empty", "email must be an email"],
    });

    expect({ validator, data: { email: 5 as any } }).containsErrorMessages({
      email: [
        "email must be an email",
        "email must be a string",
        "email must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { email: "h".repeat(256) },
    }).containsErrorMessages({
      email: [
        "email must be an email",
        "email must be shorter than or equal to 255 characters",
      ],
    });
  });

  test("invalidation cases for password field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      password: [
        "password should not be empty",
        "password must be a string",
        "password must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { password: null } }).containsErrorMessages({
      password: [
        "password should not be empty",
        "password must be a string",
        "password must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { password: "" } }).containsErrorMessages({
      password: ["password should not be empty"],
    });

    expect({ validator, data: { password: 5 as any } }).containsErrorMessages({
      password: [
        "password must be a string",
        "password must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { password: "t".repeat(256) },
    }).containsErrorMessages({
      password: ["password must be shorter than or equal to 255 characters"],
    });
  });
});
