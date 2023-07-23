import { Op, literal } from "sequelize";
import {
  Model,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "./../../../../@seedwork/infra/sequelize/sequelize-model-factory";
import {
  CustomError,
  EntityValidationError,
  LoadEntityError,
  NotFoundError,
  SortDirection,
  UniqueEntityId,
} from "./../../../../@seedwork/domain";
import {
  UserRepository as UserRepositoryContract,
  User,
  UserId,
} from "../../../domain";

export namespace UserSequelize {
  type UsersModelProperties = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  };

  @Table({ tableName: "users", timestamps: false })
  export class UserModel extends Model<UsersModelProperties> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare email: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare password: string;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    declare updated_at: Date;

    public static factory() {
      const chance: Chance.Chance = require("chance")();

      return new SequelizeModelFactory(UserModel, () => ({
        id: chance.guid({ version: 4 }),
        name: chance.word(),
        email: chance.word(),
        password: chance.word(),
        created_at: chance.date(),
        updated_at: chance.date(),
      }));
    }
  }

  export class UserRepository implements UserRepositoryContract.Repository {
    sortableFields: string[] = ["name", "created_at"];

    orderBy = {
      mysql: {
        name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
      },
    };

    constructor(private userModel: typeof UserModel) {}

    public async create(
      entity: Required<{ password: string } & User>
    ): Promise<void> {
      await this.userModel.create(entity.toJSON());
    }

    public async findById(id: string | UserId): Promise<User> {
      const _id = `${id}`;
      const model = await this._get(_id);
      return UserModelMapper.toEntity(model);
    }

    public async findByEmail(email: string): Promise<User> {
      const model = await this.userModel.findOne({ where: { email: email } });
      return UserModelMapper.toEntity(model);
    }

    public async findByEmailAlreadyExists(email: string): Promise<void> {
      const model = await this.userModel.findOne({ where: { email: email } });
      if (model) {
        throw new CustomError(`User already exists`);
      }
    }

    public async findAll(): Promise<User[]> {
      const models = await this.userModel.findAll();
      return models.map((model) => UserModelMapper.toEntity(model));
    }

    public async update(entity: User): Promise<void> {
      await this._get(entity.id);
      await this.userModel.update(entity.toJSON(), {
        where: { id: entity.id },
      });
    }

    public async delete(id: string | UserId): Promise<void> {
      const _id = `${id}`;
      await this._get(_id);
      this.userModel.destroy({ where: { id: _id } });
    }

    public async search(
      props: UserRepositoryContract.SearchParams
    ): Promise<UserRepositoryContract.SearchResult> {
      const offset = (props.page - 1) * props.per_page;
      const limit = props.per_page;

      const { rows: models, count } = await this.userModel.findAndCountAll({
        ...(props.filter && {
          where: { name: { [Op.like]: `%${props.filter}%` } },
        }),
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { order: this.formatSort(props.sort, props.sort_dir) }
          : { order: [["created_at", "DESC"]] }),
        offset,
        limit,
      });

      return new UserRepositoryContract.SearchResult({
        items: models.map((model: UserModel) =>
          UserModelMapper.toEntity(model)
        ),
        current_page: props.page,
        per_page: props.per_page,
        total: count,
        filter: props.filter,
        sort: props.sort,
        sort_dir: props.sort_dir,
      });
    }

    private async _get(id: string): Promise<UserModel> {
      return this.userModel.findByPk(id, {
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }

    private formatSort(sort: string, sort_dir: SortDirection) {
      const dialect = this.userModel.sequelize.getDialect();
      if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
        return this.orderBy[dialect][sort](sort_dir);
      }
      return [[sort, sort_dir]];
    }
  }

  export class UserModelMapper {
    public static toEntity(model: UserModel) {
      const { id, ...otherData } = model.toJSON();
      try {
        return new User(otherData, new UniqueEntityId(id));
      } catch (err) {
        if (err instanceof EntityValidationError) {
          throw new LoadEntityError(err.error);
        }
        throw err;
      }
    }
  }
}

export default UserSequelize;
