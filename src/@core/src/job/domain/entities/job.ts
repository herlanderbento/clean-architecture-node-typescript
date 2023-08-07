import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.value-object";
import AggregateRoot from "../../../@seedwork/domain/entity/aggregate-root";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import { JobFakeBuilder } from "./job-fake-builder";
import JobValidatorFactory, { JobValidator } from "../validators/job.validator";

export type JobProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type JobPropsJson = Required<{ id: string } & JobProperties>;

export class JobId extends UniqueEntityId {}

export class Job extends AggregateRoot<JobId, JobProperties, JobPropsJson> {
  public constructor(public readonly props: JobProperties, entityId?: JobId) {
    super(props, entityId ?? new JobId());
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    Job.validate(props);
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  public get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  public get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public update(name: string, description: string): void {
    Job.validate({
      name,
      description,
    });
    this.name = name;
    this.description = description;
  }

  public static validate(props: JobProperties): void {
    const validator: JobValidator = JobValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public activate(): void {
    this.props.is_active = true;
  }

  public deactivate(): void {
    this.props.is_active = false;
  }

  public static fake() {
    return JobFakeBuilder;
  }

  public toJSON(): JobPropsJson {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
