import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.value-object";
import AggregateRoot from "../../../@seedwork/domain/entity/aggregate-root";
import UserValidatorFactory, {
  UserValidator,
} from "../validators/user.validator";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import { UserFakeBuilder } from "./user-fake-builder";

export type UserProperties = {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};

export type UserPropsJson = Required<{ id: string } & UserProperties>;

export class UserId extends UniqueEntityId {}

export class User extends AggregateRoot<UserId, UserProperties, UserPropsJson> {
  constructor(public readonly props: UserProperties, entityId?: UserId) {
    super(props, entityId ?? new UserId());
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
    User.validate(props);
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  private set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  private set password(password: string) {
    this.props.password = password;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  private set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public update(name: string, email: string): void {
    User.validate({ ...this.props, name, email });
    this.name = name;
    this.email = email;
    this.updated_at = new Date();
  }

  public updatePassword(password: string) {
    User.validate({ ...this.props, password });
    this.password = password;
  }

  public static validate(props: UserProperties): void {
    const validator: UserValidator = UserValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public static fake() {
    return UserFakeBuilder;
  }

  public toJSON(): UserPropsJson {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
