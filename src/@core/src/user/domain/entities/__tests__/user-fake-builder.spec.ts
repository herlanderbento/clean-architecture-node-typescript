import { UserId } from "../user";
import { UserFakeBuilder } from "../user-fake-builder";

describe("UserFakeBuilder", () => {
  describe("entity_id props", () => {
    const faker = UserFakeBuilder.aUser();

    it("should throw error when with methods has called", () => {
      expect(() => faker["getValue"]("entity_id")).toThrow(
        new Error("Property entity_id not have a factory, use 'with' methods")
      );
    });

    it("should be undefined", () => {
      expect(faker["_entity_id"]).toBeUndefined();
    });

    test("withEntityId", () => {
      const userId = new UserId();
      const $this = faker.withEntityId(userId);

      expect($this).toBeInstanceOf(UserFakeBuilder);
      expect(faker["_entity_id"]).toBe(userId);

      faker.withEntityId(() => userId);
      expect(faker["_entity_id"]()).toBe(userId);

      expect(faker.entity_id).toBe(userId);
    });

    // it("should pass index to entity_id factory", () => {
    //   let mockFactory = jest.fn().mockReturnValue(new UserId());
    //   faker.withEntityId(mockFactory);
    //   faker.build();
    //   expect(mockFactory).toHaveBeenCalledWith(0);

    //   // mockFactory = jest.fn().mockReturnValue(new UserId());
    //   // const fakerMany = UserFakeBuilder.theUsers(2);
    //   // fakerMany.withEntityId(mockFactory);
    //   // fakerMany.build();

    //   // expect(mockFactory).toHaveBeenCalledWith(0);
    //   // expect(mockFactory).toHaveBeenCalledWith(1);
    // });
  });

  
});
