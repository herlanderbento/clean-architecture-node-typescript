import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { User, UserId } from "../../../../domain";
import { UserSequelize } from "../user-sequelize";
import _chance from "chance";
const chance = _chance();

const {
  UserModel,
  UserModelMapper,
  UserRepository: UserSequelizeRepository,
} = UserSequelize;
describe("UserRepository integration tests", () => {
  setupSequelize({ models: [UserModel] });
  let repository: UserSequelize.UserRepository;

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
  });

  it("should create a new user", async () => {
    const user = new User({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "123455",
    });
    await repository.create(user);
    const entity = await UserModel.findByPk(user.id);
    // console.log('Entity => ', entity.toJSON(), 'User =>', user.toJSON());
    expect(entity.toJSON()).toStrictEqual(user.toJSON());
  });

  it("should throws error when entity is not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    await expect(
      repository.findById(new UserId("025a9698-d6a6-43fa-943f-3a2b21b6709a"))
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 025a9698-d6a6-43fa-943f-3a2b21b6709a`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new User({
      name: "Herlander Bento",
      email: "herlanderbento@example.com",
      password: "123455",
    });
    await repository.create(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());

    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });
});
