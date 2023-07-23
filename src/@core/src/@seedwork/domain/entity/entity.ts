import { ValueObject } from "../value-objects";

export abstract class Entity<
  EntityId extends ValueObject = any,
  Props = any,
  JsonProps = Required<{ id: string } & Props>
> {
  constructor(
    public readonly props: Props,
    public readonly entityId: EntityId
  ) {}

  public get id(): string {
    return this.entityId.value;
  }

  public abstract toJSON(): JsonProps;
}

export default Entity;
