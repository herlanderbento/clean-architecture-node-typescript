import { Chance } from "chance";
import { User, UserId } from "./user";

type PropOrFactory<T> = T | ((index: number) => T);

export class UserFakeBuilder<TBuild = any> {
  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _email: PropOrFactory<string> = (_index) => this.chance.word();
  private _password: PropOrFactory<string | null> = (_index) =>
    this.chance.word();
  private _created_at = undefined;
  private countObjs: number;
  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  public get entity_id() {
    return this.getValue("entity_id");
  }

  public get name() {
    return this.getValue("name");
  }

  public get email() {
    return this.getValue("email");
  }

  public get password() {
    return this.getValue("password");
  }

  public get created_at() {
    return this.getValue("created_at");
  }

  public static aUser(): UserFakeBuilder<User> {
    return new UserFakeBuilder<User>();
  }

  public static theUsers(countObjs: number) {
    return new UserFakeBuilder<User[]>(countObjs);
  }

  public withEntityId(valueOrFactory: PropOrFactory<UserId>): this {
    this._entity_id = valueOrFactory;
    return this;
  }

  public withName(valueOrFactory: PropOrFactory<string>): this {
    this._name = valueOrFactory;
    return this;
  }

  public withInvalidNameEmpty(value: "" | null | undefined): this {
    this._name = value;
    return this;
  }

  public withInvalidNameNotAString(value?: any): this {
    this._name = value ?? 5;
    return this;
  }

  public withInvalidNameTooLong(value?: string): this {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public withEmail(valueOrFactory: PropOrFactory<string>): this {
    this._email = valueOrFactory;
    return this;
  }

  public withInvalidEmailEmpty(value: "" | null | undefined): this {
    this._email = value;
    return this;
  }

  public withInvalidEmailNotAString(value?: any): this {
    this._email = value ?? 5;
    return this;
  }

  public withInvalidEmailTooLong(value?: string): this {
    this._email = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public withPassword(valueOrFactory: PropOrFactory<string>): this {
    this._password = valueOrFactory;
    return this;
  }

  public withInvalidPasswordEmpty(value: "" | null | undefined): this {
    this._password = value;
    return this;
  }

  public withInvalidPasswordNotAString(value?: any): this {
    this._password = value ?? 5;
    return this;
  }

  public withInvalidPasswordTooLong(value?: string): this {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public withCreatedAt(valueOrFactory: PropOrFactory<Date>): this {
    this._created_at = valueOrFactory;
    return this;
  }

  public build(): TBuild {
    const users = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new User(
          {
            name: this.callFactory(this._name, index),
            email: this.callFactory(this._email, index),
            password: this.callFactory(this._password, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._entity_id
            ? undefined
            : this.callFactory(this._entity_id, index)
        )
    );
    return this.countObjs === 1 ? (users[0] as any) : users;
  }

  private getValue(prop: string) {
    const optional = ["entity_id", "created_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
