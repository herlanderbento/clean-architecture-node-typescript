import {
  NotFoundError,
  EntityValidationError,
  SortDirection,
  UniqueEntityId,
  LoadEntityError,
} from ".././../../../@seedwork/domain";
import {
  JobRepository as JobRepositoryContract,
  Job,
  JobId,
} from "../../../domain";
import { Op, literal } from "sequelize";
import { SequelizeModelFactory } from "../../../../@seedwork/infra";
import {
  Model,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export namespace JobSequelize {
  type JobsModelProperties = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
  };

  @Table({ tableName: "jobs", timestamps: false })
  export class JobModel extends Model<JobsModelProperties> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ allowNull: true, type: DataType.TEXT })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare is_active: boolean;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    public static factory() {
      const chance: Chance.Chance = require("chance")();

      return new SequelizeModelFactory(JobModel, () => ({
        id: chance.guid({ version: 4 }),
        name: chance.word(),
        description: chance.paragraph(),
        is_active: true,
        created_at: chance.date(),
      }));
    }
  }

  export class JobRepository implements JobRepositoryContract.Repository {
    sortableFields: string[] = ["name", "created_at"];

    orderBy = {
      mysql: {
        name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
      },
    };

    public constructor(private jobModel: typeof JobModel) {}

    public async create(entity: Job): Promise<void> {
      await this.jobModel.create(entity.toJSON());
    }

    async bulkCreate(entities: Job[]): Promise<void> {
      await this.jobModel.bulkCreate(entities.map((e) => e.toJSON()));
    }

    public async findById(id: string | JobId): Promise<Job> {
      const _id = `${id}`;
      const model = await this._get(_id);
      return JobModelMapper.toEntity(model);
    }

    public async findAll(): Promise<Job[]> {
      const models = await this.jobModel.findAll();

      return models.map((model) => JobModelMapper.toEntity(model));
    }

    public async update(entity: Job): Promise<void> {
      await this._get(entity.id);
      await this.jobModel.update(entity.toJSON(), {
        where: { id: entity.id },
      });
    }

    public async delete(id: string | JobId): Promise<void> {
      const _id = `${id}`;
      await this._get(_id);
      this.jobModel.destroy({ where: { id: _id } });
    }

    public async search(
      props: JobRepositoryContract.SearchParams
    ): Promise<JobRepositoryContract.SearchResult> {
      const offset = (props.page - 1) * props.per_page;
      const limit = props.per_page;

      const { rows: models, count } = await this.jobModel.findAndCountAll({
        ...(props.filter && {
          where: { name: { [Op.like]: `%${props.filter}%` } },
        }),
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { order: this.formatSort(props.sort, props.sort_dir) }
          : { order: [["created_at", "DESC"]] }),
        offset,
        limit,
      });

      return new JobRepositoryContract.SearchResult({
        items: models.map((model: JobModel) => JobModelMapper.toEntity(model)),
        current_page: props.page,
        per_page: props.per_page,
        total: count,
        filter: props.filter,
        sort: props.sort,
        sort_dir: props.sort_dir,
      });
    }

    private async _get(id: string): Promise<JobModel> {
      return this.jobModel.findByPk(id, {
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }

    private formatSort(sort: string, sort_dir: SortDirection) {
      const dialect = this.jobModel.sequelize.getDialect();
      if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
        return this.orderBy[dialect][sort](sort_dir);
      }
      return [[sort, sort_dir]];
    }
  }

  export class JobModelMapper {
    static toEntity(model: JobModel) {
      const { id, ...otherData } = model.toJSON();
      try {
        return new Job(otherData, new UniqueEntityId(id));
      } catch (err) {
        if (err instanceof EntityValidationError) {
          throw new LoadEntityError(err.error);
        }
        throw err;
      }
    }
  }
}
