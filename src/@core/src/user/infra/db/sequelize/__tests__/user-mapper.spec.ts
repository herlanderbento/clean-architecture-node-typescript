import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { User } from "../../../../domain";
import { UserSequelize } from "../user-sequelize";

describe("UserModelMapper", () => {
  setupSequelize({ models: [UserSequelize.UserModel] });
  let repository: UserSequelize.UserRepository;

  beforeEach(() => {
    repository = new UserSequelize.UserRepository(UserSequelize.UserModel);
  });

  it("should throws error when user is invalid", () => {
    const model = UserSequelize.UserModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
    });
    try {
      UserSequelize.UserModelMapper.toEntity(model);
      fail("The user is valid , but it needs throws a LoadEntityError");
    } catch (err) {
      expect(err).toBeInstanceOf(LoadEntityError);
      expect(err.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
        email: [
          "email should not be empty",
          "email must be an email",
          "email must be a string",
          "email must be shorter than or equal to 255 characters",
        ],
        password: [
          "password should not be empty",
          "password must be a string",
          "password must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest.spyOn(User, "validate").mockImplementation(() => {
      throw error;
    });
    const model = UserSequelize.UserModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
    });
    expect(() => UserSequelize.UserModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a user model to a user entity", () => {
    const created_at = new Date();
    const updated_at = new Date();

    const model = UserSequelize.UserModel.build({
      id: "025a9698-d6a6-43fa-943f-3a2b21b6709a",
      name: "some name",
      email: "email@example.com",
      password: "somepassword",
      created_at,
      updated_at,
    });
    const entity = UserSequelize.UserModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new User(
        {
          name: "some name",
          email: "email@example.com",
          password: "somepassword",
          created_at,
          updated_at,
        },
        new UniqueEntityId("025a9698-d6a6-43fa-943f-3a2b21b6709a")
      ).toJSON()
    );
  });
});
