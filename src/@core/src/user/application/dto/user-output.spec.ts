import { User } from "../../domain";
import { UserOutputMapper, UserTokenDto } from "./user-output";

describe("UserOutputMapper unit tests", () => {
  describe("toOutput method", () => {
    it("should convert a user in output", () => {
      const created_at = new Date();
      const updated_at = new Date();

      const entity = new User({
        name: "user",
        email: "user@example.com",
        password: "password",
        created_at,
        updated_at,
      });
      const spyToJSON = jest.spyOn(entity, "toJSON");
      const output = UserOutputMapper.toOutput(entity);
      expect(spyToJSON).toHaveBeenCalled();
      expect(output).toStrictEqual({
        id: entity.id,
        name: "user",
        email: "user@example.com",
        password: "password",
        created_at,
        updated_at,
      });
    });
  });

  describe("toOutputShortProps method", () => {
    it("should convert a user in toOutputShortProps", () => {
      const created_at = new Date();
      const updated_at = new Date();

      const entity = new User({
        name: "user",
        email: "user@example.com",
        password: "password",
        created_at,
        updated_at,
      });
      const output = UserOutputMapper.toOutputShortProps(entity);
      expect(output).toStrictEqual({
        id: entity.id,
        name: "user",
        email: "user@example.com",
        created_at,
        updated_at,
      });
    });
  });

  describe("toOutputUserToken method", () => {
    it("should convert UserTokenDto in output format with user token", () => {
      const userTokenDto: UserTokenDto = {
        name: "John Doe",
        email: "johndoe@example.com",
        token: "test-token",
      };

      const result = UserOutputMapper.toOutputUserToken(userTokenDto);

      const expectedResult = {
        token: userTokenDto.token,
        user: {
          name: userTokenDto.name,
          email: userTokenDto.email,
        },
      };
      expect(result).toEqual(expectedResult);
    });
  });
});
