import { UniqueEntityId } from "#seedwork/domain/value-objects";
import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import { InMemoryRepository } from "../in-memory-repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<UniqueEntityId, StubEntityProps> {
  constructor(props: StubEntityProps, entityId?: UniqueEntityId) {
    super(props, entityId ?? new UniqueEntityId());
  }

  toJSON(): { id: string } & StubEntityProps {
    return {
      id: this.id,
      name: this.props.name,
      price: this.props.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, any> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it("should creates a new entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );

    await expect(
      repository.findById(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.entityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.entityId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );

    expect(
      repository.delete(
        new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.create(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.create(entity);

    await repository.delete(entity.entityId);
    expect(repository.items).toHaveLength(0);
  });
});
